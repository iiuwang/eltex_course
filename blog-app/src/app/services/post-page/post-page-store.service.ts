import {computed, Injectable, signal} from '@angular/core';
import {Comment, Post} from '../../types/post';

@Injectable()
export class PostPageStoreService {
    readonly post = signal<Post | null>(null);
    readonly comments = computed<Comment[]>(() => this.post()?.comments ?? []);

    setPost(post: Post | null): void {
        this.post.set(post);
      }

    updatePostRating(rating: number): void {
        const currentPost = this.post();
        if (!currentPost) {
          return;
        }
        this.post.set({...currentPost, rating,});
    }

    setComments(comments: Comment[]): void {
        const currentPost = this.post();
        if (!currentPost) {
          return;
        }
        this.post.set({...currentPost, comments,});
      }
}