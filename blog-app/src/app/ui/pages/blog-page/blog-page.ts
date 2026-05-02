import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogPost } from '../../components/blog-post/blog-post';
import { FormAddPost } from "../../components/form-add-post/form-add-post";
import { Post } from '../../../types/post';
import { DialogStatistics } from '../../components/dialog-statistics/dialog-statistics';

@Component({
  selector: 'app-blog-page',
  imports: [BlogPost, FormAddPost, DialogStatistics],
  templateUrl: './blog-page.html',
  styleUrl: './blog-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BlogPage { 

  protected posts: Post[] = [];
  protected editingPost: Post | null = null; 
  protected addFormVisible = false;
  protected statisticsVisible = false;

  constructor(){
    const saved=localStorage.getItem('blog_posts');
    if (saved){
      let posts: Post[] = JSON.parse(saved);
      if (posts.length > 0 && posts[0].id === undefined) {
      posts = posts.map((p, index) => ({
        ...p,
        id: index + 1
      }));
      localStorage.setItem('blog_posts', JSON.stringify(posts));
      }
      this.posts = posts; 
    } else {
      this.posts=[];
    }
  }
  // попытка сделать условное отображенние формы
  
  protected switchForm() {
    this.addFormVisible = !this.addFormVisible;
    if (!this.addFormVisible) {
      this.editingPost = null;
    }
  }
  protected onEditPost(post: Post) {
    this.editingPost = post;
    this.addFormVisible = true;
  }
  protected onAddPost(data: Pick<Post,'title'|'description'>){
    const newPost: Post = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      date: new Date().toLocaleDateString('ru-RU'),
      image:'selection.png'
    }
    this.posts = [newPost,...this.posts];
    localStorage.setItem('blog_posts', JSON.stringify(this.posts));
    this.addFormVisible = false;
  }

  protected onUpdatePost(data: { id: number; title: string; description: string }) {
    this.posts = this.posts.map(post => 
      post.id === data.id 
        ? { ...post, title: data.title, description: data.description }
        : post
    );
    localStorage.setItem('blog_posts', JSON.stringify(this.posts));
    this.addFormVisible = false;
    this.editingPost = null;
  }
  protected onDeletePost(postId: number){
    
    this.posts = this.posts.filter(post => post.id !== postId);
    
    localStorage.setItem('blog_posts', JSON.stringify(this.posts));
  }
  
  protected get totalComments(): number{
    return 0;
  }

  protected switchStatistics() {
    this.statisticsVisible = !this.statisticsVisible;
  }

}
