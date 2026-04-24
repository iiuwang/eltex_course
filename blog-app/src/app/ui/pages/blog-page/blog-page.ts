import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogPost } from '../../components/blog-post/blog-post';
import { FormAddPost } from "../../components/form-add-post/form-add-post";

@Component({
  selector: 'app-blog-page',
  imports: [BlogPost, FormAddPost],
  templateUrl: './blog-page.html',
  styleUrl: './blog-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BlogPage { 
  // попытка сделать условное отображенние формы
  addFormVisible = false;
  switchForm() {
    this.addFormVisible = !this.addFormVisible;
  }

  posts = [
  {
    title: 'Статья 1',
    description: 'Описание статьи 1',
    date: '10 апреля 2026',
    image: 'selection.png'
  },
  {
    title: 'Статья 2',
    description: 'Описание статьи 2',
    date: '12 апреля 2026',
    image: 'selection.png'
  },
  {
    title: 'Статья 3',
    description: 'Описание статьи 3',
    date: '12 апреля 2026',
    image: 'selection.png'
  }
  ];
}
