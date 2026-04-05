//всего статей
function postCount(){
    const posts = document.querySelectorAll('.posts_card article');
    const countElement = document.getElementById('post_count');
    countElement.textContent = posts.length;
}
// диалоговое
const openButton = document.getElementById('openModalButton');
const dialogWindow = document.getElementById('statistics_dialog');

openButton.addEventListener('click',() => {
    postCount();
    dialogWindow.showModal();
});

dialogWindow.addEventListener('click', (e) => {
    if (e.target === dialogWindow) {
        dialogWindow.close('backdrop');
    }
});

//добавить пост
const showAddButton = document.getElementById('showAddButton');
showAddButton.addEventListener('click', () => {
    document.getElementById('add_post').classList.add('active');
});
//showAddButton.addEventListener('click',()=>{
    //document.getElementById('add_post').style.display = 'block';
//});
const form = document.querySelector('.create_post');
//cкрыть форму добавления поста
const hideAddButton = document.getElementById('del_button');
hideAddButton.addEventListener('click', () => {
    form.reset();
    document.getElementById('add_post').classList.remove('active');
});
//hideAddButton.addEventListener('click',()=>{
   // document.getElementById('add_post').style.display = 'none';
//});

//добавление постов
function addPost(title, text, date){
    const template = document.getElementById('post_template');
    const container = document.querySelector('.posts_card');
    
    const clone = template.content.cloneNode(true);
    clone.querySelector('.blog-article-title').textContent = title;
    clone.querySelector('.blog-article-description').textContent = text;
    clone.querySelector('.date_post').textContent = "Опубликовано: " + date;

    container.prepend(clone);
    postCount();
};

// const addPostButton = document.getElementById('add_button');
// addPostButton.addEventListener('click',(e) => {
//     e.preventDefault();

//     const title = document.getElementById('name_post').value;
//     const date = new Date().toLocaleDateString('ru-RU');

//     addPost(title, date);
//     document.querySelector('.create_post').reset();
//     document.getElementById('add_post').classList.remove('active');
// });

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = form["name_post"].value.trim();
    const text = form["text_post"].value.trim();

    if (!title || !text) {
        alert('Заполните все поля');
        return;
    }

    const date = new Date().toLocaleDateString('ru-RU');

    addPost(title, text, date);
    form.reset();
    document.getElementById('add_post').classList.remove('active');
})
//удаление статьи
const postsContainer = document.querySelector('.posts_card');

postsContainer.addEventListener('click', (e) => {
    const deleteButton = e.target.closest('.hover_delete'); 
    if (deleteButton) {
        const card = deleteButton.closest('.card_item'); 
        if (card) {
            card.remove();
        }
        postCount();
    }
});