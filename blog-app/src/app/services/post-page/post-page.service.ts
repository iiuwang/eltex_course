import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiArticle, ApiComment } from '../../types/api/article-api';
import { AddCommentData, Comment, Post } from '../../types/post';
import { ArticlesMapper } from '../articles/articles.mapper';

const STORAGE_KEY = 'blog_posts';

@Injectable()
export class PostPageService {
  private readonly http = inject(HttpClient);
  private readonly mapper = inject(ArticlesMapper);

  getPostWithComments(postId: string): Observable<Post | undefined> {
    if (environment.useBackend) {
      return this.getPostWithCommentsFromApi(postId);
    }

    const posts = this.readAll();
    const post = posts.find((post) => post.id === postId);
    return of(post);
  }

  addComment(postId: string, data: AddCommentData): Observable<Post | undefined> {
    if (environment.useBackend) {
      return this.http
        .post<ApiComment>(`${environment.apiUrl}/comments`, {
          username: data.author,
          content: data.text,
          articleId: postId,
        })
        .pipe(switchMap(() => this.getPostWithCommentsFromApi(postId)));
    }

    const newComment: Comment = {
      id: String(Date.now()),
      author: data.author,
      text: data.text,
      date: new Date().toLocaleDateString('ru-RU'),
      rating: 0,
    };

    const updatedPost = this.updatePost(postId, (post) => ({...post, comments: [...post.comments, newComment]}));
    return of(updatedPost);
  }

  updatePostRating(postId: string, change: number): Observable<Post | undefined> {
    if (environment.useBackend) {
      const ratingUrl =
        change > 0
          ? `${environment.apiUrl}/articles/${postId}/rating-up`
          : `${environment.apiUrl}/articles/${postId}/rating-down`;

      return this.http
        .patch<ApiArticle>(ratingUrl, {})
        .pipe(switchMap(() => this.getPostWithCommentsFromApi(postId)));
    }

    const updatedPost = this.updatePost(postId, (post) => ({...post, rating: post.rating + change}));

    return of(updatedPost);
  }

  updateCommentRating(
    postId: string,
    commentId: string,
    change: number,
  ): Observable<Post | undefined> {
    if (environment.useBackend) {
      return this.getCommentsFromApi(postId).pipe(
        switchMap((comments) => {
          const currentComment = comments.find((comment) => comment.id === commentId);

          if (!currentComment) {
            return this.getPostWithCommentsFromApi(postId);
          }

          return this.http
            .patch<ApiComment>(`${environment.apiUrl}/comments/${commentId}/rating`, {
              rating: currentComment.rating + change,
            })
            .pipe(switchMap(() => this.getPostWithCommentsFromApi(postId)));
        }),
      );
    }

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

  private updatePost(postId: string, updater: (post: Post) => Post): Post | undefined {
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

  private getPostWithCommentsFromApi(postId: string): Observable<Post | undefined> {
    return forkJoin({
      article: this.http.get<ApiArticle>(`${environment.apiUrl}/articles/${postId}`),
      comments: this.getCommentsFromApi(postId),
    }).pipe(
      map(({ article, comments }) => ({
        ...this.mapper.mapArticleToPost(article),
        comments,
      })),
    );
  }

  private getCommentsFromApi(postId: string): Observable<Comment[]> {
    return this.http
      .get<ApiComment[]>(`${environment.apiUrl}/comments/article/${postId}`)
      .pipe(
        map((comments) =>
          comments.map((comment) => ({
            id: comment.id,
            author: comment.username,
            text: comment.content,
            date: new Date(comment.createdAt).toLocaleDateString('ru-RU'),
            rating: comment.rating ?? 0,
          })),
        ),
      );
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