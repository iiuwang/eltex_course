import {Observable} from 'rxjs';
import {AddPostData, UpdatePostData} from '../../types/post';
import { IArticlesResult } from '../../types/interfaces/i-articles-result.interface';

export interface IArticlesService {
    getArticles(page: number): Observable<IArticlesResult>;
    addArticle(data: AddPostData, page: number): Observable<IArticlesResult>;
    updateArticle(data: UpdatePostData, page: number): Observable<IArticlesResult>;
    deleteArticle(id: number, page: number): Observable<IArticlesResult>;
}