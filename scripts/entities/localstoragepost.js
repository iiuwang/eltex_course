export class LocalStoragePost {
    storageKey = 'blog_posts';

    getPosts() {
        const posts = localStorage.getItem(this.storageKey);
        if (posts) {
            return JSON.parse(posts);
        } 
        else {
            return [];
        }
    }

    savePost(post) {
        const posts = this.getPosts();
        posts.push(post);
        localStorage.setItem(this.storageKey, JSON.stringify(posts));
    }

    deletePost(id) {
        let posts = this.getPosts();
        posts = posts.filter(p => p.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(posts));
    }
}