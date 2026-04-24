import { LocalStoragePost } from './localstoragepost.js';
import { Post } from './post.js';


export class Blog {
    list = [];
    storage;

    constructor(storage) {
        this.storage = storage;

        this.countElement = document.getElementById('post_count');
        this.emptyMessage = document.querySelector('.empty');
        this.loader = document.getElementById('loader');
        this.container = document.querySelector('.posts_card');

        this.showLoader();

        this.loadPosts().then(posts => {
            this.list = posts.map(data => {
                const post = new Post(data.title, data.text);
                post.id = data.id;
                post.date = data.date;
                post.render();
                return post;
            });

            this.updateUI();
        }).finally(() => {
            this.hideLoader();
        });
    }

    add(post) {
        this.list.push(post);
        this.storage.saveState(this.list);
        post.render();
        this.updateUI();
    }

    delete(id) {
        this.list = this.list.filter(p => p.id !== id);
        this.storage.saveState(this.list);
        const card = document.querySelector(`.card_item[data-id="${id}"]`);
        if (card) {
            card.remove();
        }
        this.updateUI();
    }

    loadPosts() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.storage.getPosts() ?? []);
            }, 1000);
        });
    }

    updateUI() {
        if (this.list.length === 0) {
            this.emptyMessage.style.display = 'flex';
        } else {
            this.emptyMessage.style.display = 'none';
        }

        if (this.countElement) {
            this.countElement.textContent = this.list.length;
        }
    }

    showLoader() {
        this.loader.classList.add('show');
        this.container.style.display = 'none';
        this.emptyMessage.style.display = 'none';
    }

    hideLoader() {
        this.loader.classList.remove('show');
        this.container.style.display = 'grid';
    }
}
export const blog = new Blog(new LocalStoragePost());
//const blog = new Blog(new LocalStoragePost());
const addSection = document.getElementById('add_post');
const showAddButton = document.getElementById('showAddButton');
const hideAddButton = document.getElementById('del_button');
// форма добавления статьи
const form = document.querySelector('.create_post');
showAddButton.addEventListener('click', () => {
    addSection.classList.add('active');
    setTimeout(() => {
        addSection.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 200);
});

hideAddButton.addEventListener('click', () => {
    form.reset();
    addSection.classList.remove('active');
});

form.addEventListener('submit', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const title = form["name_post"].value.trim();
    const text = form["text_post"].value.trim();
    if (!title || !text) {
        return alert('Заполните все поля');
    } 

    const submitButton = form.querySelector('#add_button');
    submitButton.disabled = true;
    Array.from(form.elements).forEach(el => el.disabled = true);
   
    const post = new Post(title, text);
    blog.showLoader();
    new Promise(resolve => setTimeout(resolve, 1000))
        .then(() => {
            blog.add(post);
        })
        .finally(() => {
            blog.hideLoader();

            submitButton.disabled = false;
            Array.from(form.elements).forEach(el => el.disabled = false);

            form.reset();
            addSection.classList.remove('active');
        });
});

// удаление статей
const postsContainer = document.querySelector('.posts_card');
postsContainer.addEventListener('click', e => {
    const deleteButton = e.target.closest('.hover_delete'); 
    if (deleteButton) {
        const card = deleteButton.closest('.card_item'); 
        if (card) {
            blog.delete(card.dataset.id);
        } 
    }
});