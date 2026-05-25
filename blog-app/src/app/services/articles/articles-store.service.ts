import { Injectable, signal } from "@angular/core";
import { Post } from "../../types/post";

@Injectable({
    providedIn: 'root',
  })
export class ArticlesStoreService {
    readonly posts = signal<Post[]>([]);
    readonly activePage = signal(1);

    setPosts(posts: Post[]): void {
        this.posts.set(posts);
    }

    setActivePage(page: number): void {
        this.activePage.set(page);
    }
      

}