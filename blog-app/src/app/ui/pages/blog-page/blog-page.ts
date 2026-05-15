import { ChangeDetectionStrategy, Component, signal, computed, inject,OnInit } from '@angular/core';
import { BlogPost } from '../../components/blog-post/blog-post';
import { FormAddPost } from '../../components/form-add-post/form-add-post';
import { Post, UpdatePostData, AddPostData } from '../../../types/post';
import { DialogStatistics } from '../../components/dialog-statistics/dialog-statistics';
import { ArticlesStoreService } from '../../../services/articles/articles-store.service';
import { ARTICLES_SERVICE } from '../../../services/articles/articles-service.token';

@Component({
  selector: 'app-blog-page',
  imports: [BlogPost, FormAddPost, DialogStatistics],
  templateUrl: './blog-page.html',
  styleUrl: './blog-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BlogPage implements OnInit {
  private readonly store = inject(ArticlesStoreService);
  private readonly articles = inject(ARTICLES_SERVICE);
  private readonly pageSize = 7;
  protected editingPost = signal<Post | null>(null);
  protected addFormVisible = signal(false);
  protected statisticsVisible = signal(false);
  protected readonly allPosts = this.store.posts;

  protected readonly visiblePosts = computed(() => {
    const limit = this.store.activePage() * this.pageSize;
    return this.store.posts().slice(0, limit);
  });

  protected readonly canLoadMore = computed(() => {
    return this.visiblePosts().length < this.store.posts().length;
  });

  protected readonly totalPosts = computed(() => this.store.posts().length);

  ngOnInit(): void {
    this.loadArticlesIfNeeded();
  }

  private loadArticlesIfNeeded(): void {
    if (this.store.posts().length > 0) {
      return;
    }
    const page = this.store.activePage();
    this.articles.getArticles(page).subscribe((result) => {
      this.store.setPosts(result.allPosts);
      this.store.setActivePage(page);
    });
  }

  protected loadMore(): void {
    const nextPage = this.store.activePage() + 1;
    this.store.setActivePage(nextPage);
  }


  protected switchForm() {
    this.addFormVisible.update((visible) => !visible);
    if (!this.addFormVisible()) {
      this.editingPost.set(null);
    }
  }

  protected onEditPost(post: Post) {
    this.editingPost.set(post);
    this.addFormVisible.set(true);
  }

  protected onAddPost(data: AddPostData): void {
    const page = this.store.activePage();
    this.articles.addArticle(data, page).subscribe((result) => {
      this.store.setPosts(result.allPosts);
      this.addFormVisible.set(false);
    });
  }

  protected onUpdatePost(data: UpdatePostData): void {
    const page = this.store.activePage();
    this.articles.updateArticle(data, page).subscribe((result) => {
      this.store.setPosts(result.allPosts);
      this.addFormVisible.set(false);
      this.editingPost.set(null);
    });
  }

  protected onDeletePost(postId: number): void {
    const page = this.store.activePage();
    this.articles.deleteArticle(postId, page).subscribe((result) => {
      this.store.setPosts(result.allPosts);
      if (this.editingPost()?.id === postId) {
        this.addFormVisible.set(false);
        this.editingPost.set(null);
      }
    });
  }

  protected get totalComments(): number {
    return 0;
  }

  protected switchStatistics() {
    this.statisticsVisible.update((visible) => !visible);
  }
}
