import { Injectable } from "@angular/core";
import { Observable,of } from "rxjs";
import{ArticlesResult,ArticlesService} from "./articles-service.interface";
import {Post,AddPostData,UpdatePostData} from "../../types/post";

const STORAGE_KEY = 'blog_posts';
const PAGE_SIZE = 7;

@Injectable()
export class ArticlesServiceImpl implements ArticlesService {
    private readAll(): Post[] {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
          return [];
        }
        let posts: Post[] = JSON.parse(saved);
        if (posts.length > 0 && posts[0].id === undefined) {
          posts = posts.map((p, index) => ({
            ...p,
            id: index + 1,
          }));
          this.writeAll(posts);
        }
        return posts;
      }

    private writeAll(posts: Post[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }

    private toResult(all: Post[], page: number): ArticlesResult {
        const limit = page * PAGE_SIZE;
        return {
          items: all.slice(0, limit),
          total: all.length,
          allPosts: all,
        };
    }

    getArticles(page: number): Observable<ArticlesResult> {
        const all = this.readAll();
        return of(this.toResult(all, page));
    }

    addArticle(data: AddPostData, page: number): Observable<ArticlesResult> {
        const all = this.readAll();
        const newPost: Post = {
          id: Date.now(),
          title: data.title,
          description: data.description,
          date: new Date().toLocaleDateString('ru-RU'),
          image: 'selection.png',
        };
        const updated = [newPost, ...all];
        this.writeAll(updated);
        return of(this.toResult(updated, page));
    }

    updateArticle(data: UpdatePostData, page: number): Observable<ArticlesResult> {
        const all = this.readAll();
        const updated = all.map((post) =>
          post.id === data.id
            ? { ...post, title: data.title, description: data.description }
            : post,
        );
        this.writeAll(updated);
        return of(this.toResult(updated, page));
    }

    deleteArticle(id: number, page: number): Observable<ArticlesResult> {
        const all = this.readAll();
        const updated = all.filter((post) => post.id !== id);
        this.writeAll(updated);
        return of(this.toResult(updated, page));
    }

}