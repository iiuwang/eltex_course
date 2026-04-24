import { blog } from './entities/blog.js';
//показыаем и скрываем надпись в заивисимости от нналичия статей
// function showEmptyMessage() {
//     const posts = document.querySelectorAll('.posts_card .card_item');
//     const emptyMessage = document.querySelector('.empty');

//     if (posts.length === 0) {
//         emptyMessage.style.display = 'flex';
//     } else {
//         emptyMessage.style.display = 'none';
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     showEmptyMessage();
//     postCount();
// });

//всего статей
// function postCount(){
//     const posts = document.querySelectorAll('.posts_card article');
//     const countElement = document.getElementById('post_count');
//     countElement.textContent = posts.length;
// }
// диалоговое
const openButton = document.getElementById('openModalButton');
const dialogWindow = document.getElementById('statistics_dialog');
const countElement = document.getElementById('post_count');
openButton.addEventListener('click', () => {
    countElement.textContent = blog.list.length;
    dialogWindow.showModal();
});

// openButton.addEventListener('click',() => {
//     postCount();
//     dialogWindow.showModal();
// });

dialogWindow.addEventListener('click', (e) => {
    if (e.target === dialogWindow) {
        dialogWindow.close('backdrop');
    }
});
