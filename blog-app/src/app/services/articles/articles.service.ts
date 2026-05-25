import { Injectable } from "@angular/core";
import { Observable,from,of } from "rxjs";
import { map } from "rxjs";
import{IArticlesService} from "./articles-service.interface";
import {Post,AddPostData,UpdatePostData} from "../../types/post";
import { IArticlesResult } from "../../types/interfaces/i-articles-result.interface";
const STORAGE_KEY = 'blog_posts';
const PAGE_SIZE = 7;

@Injectable()
export class ArticlesServiceImpl implements IArticlesService {
    private readAll(): Post[] {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
          return [];
        }
        let posts: Post[] = JSON.parse(saved);
        if (posts.length > 0 && posts[0].id === undefined) {
          posts = posts.map((p, index) => ({
            ...p,
            id: String(index + 1),
          }));
          this.writeAll(posts);
        }
        return posts;
      }

    private writeAll(posts: Post[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }

    private toResult(all: Post[], page: number): IArticlesResult {
        const limit = page * PAGE_SIZE;
        return {
          items: all.slice(0, limit),
          total: all.length,
          allPosts: all,
        };
    }

    getArticles(page: number): Observable<IArticlesResult> {
        const all = this.readAll();
        return of(this.toResult(all, page));
    }

    addArticle(data: AddPostData, page: number): Observable<IArticlesResult> {
        return from(this.fileToBase64(data.imageFile)).pipe(
          map((image) => {
            const all = this.readAll();
            const newPost: Post = {
              id: String(Date.now()),
              title: data.title,
              description: data.description,
              date: new Date().toLocaleDateString('ru-RU'),
              image: image ?? 'selection.png',
              rating: 0,
              comments: [],
            };
            const updated = [newPost, ...all];
            this.writeAll(updated);
            return this.toResult(updated, page);
          }),
        );
    }

    updateArticle(data: UpdatePostData, page: number): Observable<IArticlesResult> {
        return from(this.fileToBase64(data.imageFile)).pipe(
          map((image) => {
            const all = this.readAll();
            const updated = all.map((post) =>
              post.id === data.id
                ? { ...post, title: data.title, description: data.description, image: image ?? post.image }
                : post,
            );
            this.writeAll(updated);
            return this.toResult(updated, page);
          }),
        );
    }

    deleteArticle(id: string, page: number): Observable<IArticlesResult> {
        const all = this.readAll();
        const updated = all.filter((post) => post.id !== id);
        this.writeAll(updated);
        return of(this.toResult(updated, page));
    }

    private fileToBase64(file?: File | null): Promise<string | null> {
        if (!file) {
          return Promise.resolve(null);
        }

        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        });
    }

}