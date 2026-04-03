export class Post{
    // static container = 'posts_card';
    // static template = 'post_template';

    constructor(title, text){
        this.id = crypto.randomUUID();
        this.title = title;
        this.text = text;
        this.date = new Date().toLocaleDateString('ru-Ru');
    }

    render() {
        const template = document.getElementById('post_template');
        const container = document.querySelector('.posts_card');
        const clone = template.content.cloneNode(true);

        clone.querySelector('.blog-article-title').textContent = this.title;
        clone.querySelector('.blog-article-description').textContent = this.text;
        clone.querySelector('.date_post').textContent = "Опубликовано: " + this.date;
        clone.querySelector('.card_item').dataset.id = this.id;
        // clone.querySelector('img').src = './assets/selection.png'; 
        // clone.querySelector('.hover_delete img').src = './assets/delete.png';
        container.prepend(clone);
    }

}