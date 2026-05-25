import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AddCommentData, Comment, Post } from '../../types/post';

const STORAGE_KEY = 'blog_posts';

@Injectable()
export class PostPageService {
  getPostWithComments(postId: number): Observable<Post | undefined> {
    const posts = this.readAll();
    const post = posts.find((post) => post.id === postId);
    return of(post);
  }

  addComment(postId: number, data: AddCommentData): Observable<Post | undefined> {
    const newComment: Comment = {
      id: Date.now(),
      author: data.author,
      text: data.text,
      date: new Date().toLocaleDateString('ru-RU'),
      rating: 0,
    };

    const updatedPost = this.updatePost(postId, (post) => ({...post, comments: [...post.comments, newComment]}));
    return of(updatedPost);
  }

  updatePostRating(postId: number, change: number): Observable<Post | undefined> {
    const updatedPost = this.updatePost(postId, (post) => ({...post, rating: post.rating + change}));

    return of(updatedPost);
  }

  updateCommentRating(
    postId: number,
    commentId: number,
    change: number,
  ): Observable<Post | undefined> {
    const updatedPost = this.updatePost(postId, (post) => ({
      ...post,
      comments: post.comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, rating: comment.rating + change }
          : comment,
      ),
    }));
    return of(updatedPost);
  }

  private updatePost(postId: number, updater: (post: Post) => Post): Post | undefined {
    const posts = this.readAll();
    let updatedPost: Post | undefined;

    const updatedPosts = posts.map((post) => {
      if (post.id !== postId) {
        return post;
      }

      updatedPost = updater(post);
      return updatedPost;
    });
    this.writeAll(updatedPosts);
    return updatedPost;
  }

  private readAll(): Post[] {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return [];
    }

    const posts = JSON.parse(saved) as Post[];

    return posts.map((post) => ({...post, rating: post.rating ?? 0, comments: post.comments ?? []}));
  }

  private writeAll(posts: Post[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }
}