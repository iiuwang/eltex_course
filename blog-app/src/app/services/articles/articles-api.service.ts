import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AddPostData, Comment, UpdatePostData } from '../../types/post';
import { ApiArticle, ApiArticlesResult, ApiComment } from '../../types/api/article-api';
import { IArticlesResult } from '../../types/interfaces/i-articles-result.interface';
import { IArticlesService } from './articles-service.interface';
import { ArticlesMapper } from './articles.mapper';

const PAGE_SIZE = 7;

@Injectable()
export class ArticlesApiService implements IArticlesService {
  private readonly http = inject(HttpClient);
  private readonly mapper = inject(ArticlesMapper);

  getArticles(page: number): Observable<IArticlesResult> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', PAGE_SIZE)
      .set('cumulative', true);

    return this.http
      .get<ApiArticlesResult>(`${environment.apiUrl}/articles`, { params })
      .pipe(
        switchMap((result) => {
          if (result.items.length === 0) {
            return of({
              items: [],
              total: result.total,
              allPosts: [],
            });
          }

          return forkJoin(
            result.items.map((article) =>
              this.getComments(article.id).pipe(
                map((comments) => ({
                  article,
                  comments,
                })),
              ),
            ),
          ).pipe(
            map((items) => {
              const posts = items.map(({ article, comments }) => ({
                ...this.mapper.mapArticleToPost(article),
                comments,
              }));

              return {
                items: posts,
                total: result.total,
                allPosts: posts,
              };
            }),
          );
        }),
      );
  }

  addArticle(data: AddPostData, page: number): Observable<IArticlesResult> {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('content', data.description);
    if (data.imageFile) {
        formData.append('image', data.imageFile);
    }

    return this.http
      .post<ApiArticle>(`${environment.apiUrl}/articles`, formData)
      .pipe(switchMap(() => this.getArticles(page)));
  }

  updateArticle(data: UpdatePostData, page: number): Observable<IArticlesResult> {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('content', data.description);
    if (data.imageFile) {
        formData.append('image', data.imageFile);
    }

    return this.http
      .patch<ApiArticle>(`${environment.apiUrl}/articles/${data.id}`, formData)
      .pipe(switchMap(() => this.getArticles(page)));
  }

  deleteArticle(id: string, page: number): Observable<IArticlesResult> {
    return this.http
      .delete<ApiArticle>(`${environment.apiUrl}/articles/${id}`)
      .pipe(switchMap(() => this.getArticles(page)));
  }

  private getComments(articleId: string): Observable<Comment[]> {
    return this.http
      .get<ApiComment[]>(`${environment.apiUrl}/comments/article/${articleId}`)
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
}