// диалоговое
const openButton=document.getElementById('openModalButton');
const dialogWindow=document.getElementById('statistics_dialog');

openButton.addEventListener('click',()=>{
    dialogWindow.showModal();
});

dialogWindow.addEventListener('click', (e) => {
    if (e.target === dialogWindow) dialogWindow.close('backdrop');
});

//добавитьпост
const showAddButton=document.getElementById('showAddButton');
showAddButton.addEventListener('click', () => {
    document.getElementById('add_post').classList.add('active');
});
//showAddButton.addEventListener('click',()=>{
    //document.getElementById('add_post').style.display = 'block';
//});

//cкрыть форму добавления поста
const hideAddButton=document.getElementById('del_button');
hideAddButton.addEventListener('click', () => {
    document.getElementById('add_post').classList.remove('active');
});
//hideAddButton.addEventListener('click',()=>{
   // document.getElementById('add_post').style.display = 'none';
//});

//добавление постов
function AddPost(title,date){
    const template = document.getElementById('post_template');
    const container = document.querySelector('.posts_card');
    

    const clone = template.content.cloneNode(true);
    clone.querySelector('.title_post').textContent = title;
    clone.querySelector('.date_post').textContent = "Опубликовано: " + date;

    container.appendChild(clone);
};

const addPostButton=document.getElementById('add_button');
addPostButton.addEventListener('click',(e)=>{
    e.preventDefault();
    AddPost("Тестирование фукнции", "27 марта 2026");
});
