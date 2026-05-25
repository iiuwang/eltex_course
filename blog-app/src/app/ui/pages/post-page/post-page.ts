import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddCommentData } from '../../../types/post';
import { PostPageService } from '../../../services/post-page/post-page.service';
import { PostPageStoreService } from '../../../services/post-page/post-page-store.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [RouterLink, FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule],
  providers: [PostPageService, PostPageStoreService],
  templateUrl: './post-page.html',
  styleUrl: './post-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly postPageService = inject(PostPageService);
  private readonly postPageStore = inject(PostPageStoreService);

  protected readonly postId = this.route.snapshot.paramMap.get('postId') ?? '';

  protected readonly post = this.postPageStore.post;
  protected readonly comments = this.postPageStore.comments;

  protected readonly author = signal('');
  protected readonly text = signal('');

  ngOnInit(): void {
    this.postPageService.getPostWithComments(this.postId).subscribe((post) => {
      this.postPageStore.setPost(post ?? null);
    });
  }

  protected increasePostRating(): void {
    this.updatePostRating(1);
  }

  protected decreasePostRating(): void {
    this.updatePostRating(-1);
  }

  protected increaseCommentRating(commentId: string): void {
    this.updateCommentRating(commentId, 1);
  }

  protected decreaseCommentRating(commentId: string): void {
    this.updateCommentRating(commentId, -1);
  }

  protected addComment(): void {
    const data: AddCommentData = {
      author: this.author().trim(),
      text: this.text().trim(),
    };
    if (!data.author || !data.text) {
      return;
    }
    this.postPageService.addComment(this.postId, data).subscribe((post) => {
      this.postPageStore.setPost(post ?? null);
      this.author.set('');
      this.text.set('');
    });
  }

  protected cancelComment(): void {
    this.author.set('');
    this.text.set('');
  }

  private updatePostRating(change: number): void {
    this.postPageService.updatePostRating(this.postId, change).subscribe((post) => {
      this.postPageStore.setPost(post ?? null);
    });
  }

  private updateCommentRating(commentId: string, change: number): void {
    this.postPageService
      .updateCommentRating(this.postId, commentId, change)
      .subscribe((post) => {
        this.postPageStore.setPost(post ?? null);
      });
  }
}