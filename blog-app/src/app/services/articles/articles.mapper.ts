import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Post } from '../../types/post';
import { ApiArticle } from '../../types/api/article-api';

@Injectable({
  providedIn: 'root',
})
export class ArticlesMapper {
  mapArticleToPost(article: ApiArticle): Post {
    return {
      id: article.id,
      title: article.title,
      description: article.content,
      date: new Date(article.createdAt).toLocaleDateString('ru-RU'),
      image: article.imgSrc
        ? `${environment.imageBaseUrl}${article.imgSrc}`
        : 'selection.png',
      rating: article.rating ?? 0,
      comments: [],
    };
  }
}