import { LocalStoragePost } from './localstoragepost.js';
import { Post } from './post.js';


export class Blog {
    list = [];
    storage;

    constructor(storage) {
        this.storage = storage;

        const savedPosts = storage.getPosts();
        if (savedPosts && Array.isArray(savedPosts)) {
            savedPosts.forEach(data => {
                const post = new Post(data.title, data.text);
                post.id = data.id;
                post.date = data.date;
                this.add(post, false); 
            });
        }
    }

    add(post, save = true) {
        this.list.push(post);
        if (save) this.storage.savePost(post);
        post.render();
        this.updateUI();
    }

    delete(id) {
        this.list = this.list.filter(p => p.id !== id);
        this.storage.deletePost(id);
        const card = document.querySelector(`.card_item[data-id="${id}"]`);
        if (card) {
            card.remove();
        }
        this.updateUI();
    }

    updateUI() {
        const emptyMessage = document.querySelector('.empty');

        if (this.list.length === 0) {
            emptyMessage.style.display = 'flex';
        } 
        else {
            emptyMessage.style.display = 'none';
        }

        const countElement = document.getElementById('post_count');

        if (countElement) {
            countElement.textContent = this.list.length;
        }
    }
}

function showLoader() {
    const loader = document.querySelector('.loader');
    loader.classList.add('show');
}

function hideLoader() {
    const loader = document.querySelector('.loader');
    loader.classList.remove('show');
}

function loadPosts(blog) {
    return new Promise(resolve => {
        showLoader();

        setTimeout(() => {
            const savedPosts = blog.storage.getPosts();
            if (savedPosts && Array.isArray(savedPosts)) {
                savedPosts.forEach(data => {
                    const post = new Post(data.title, data.text);
                    post.id = data.id;
                    post.date = data.date;
                    blog.add(post, false); 
                });
            }
            hideLoader();
            resolve();
        }, 1000); 
    });
}



const blog = new Blog(new LocalStoragePost());

loadPosts(blog).then(() => {
    blog.updateUI();
});

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
    const title = form["name_post"].value.trim();
    const text = form["text_post"].value.trim();
    if (!title || !text) return alert('Заполните все поля');

    const post = new Post(title, text);
    blog.add(post);
    form.reset();
    document.getElementById('add_post').classList.remove('active');
});

// удаление статей
const postsContainer = document.querySelector('.posts_card');
postsContainer.addEventListener('click', e => {
    const deleteButton = e.target.closest('.hover_delete'); 
    if (deleteButton) {
        const card = deleteButton.closest('.card_item'); 
        if (card) blog.delete(card.dataset.id);
    }
});