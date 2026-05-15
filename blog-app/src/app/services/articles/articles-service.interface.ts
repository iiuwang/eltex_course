import {Observable} from 'rxjs';
import {AddPostData, UpdatePostData, Post} from '../../types/post';

export interface ArticlesResult {
    items: Post[];
    total: number;
    allPosts: Post[];

}

export interface ArticlesService {
    getArticles(page: number): Observable<ArticlesResult>;
    addArticle(data: AddPostData, page: number): Observable<ArticlesResult>;
    updateArticle(data: UpdatePostData, page: number): Observable<ArticlesResult>;
    deleteArticle(id: number, page: number): Observable<ArticlesResult>;
}