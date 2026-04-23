import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogPost } from '../../components/blog-post/blog-post';

@Component({
  selector: 'app-blog-page',
  imports: [BlogPost],
  templateUrl: './blog-page.html',
  styleUrl: './blog-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BlogPage { 
    posts = [
    {
      title: 'Статья 1',
      description: 'Описание статьи',
      date: '10 апреля 2026',
      image: 'selection.png'
    },
    {
      title: 'Статья 2',
      description: 'Ещё описание',
      date: '12 апреля 2026',
      image: 'selection.png'
    },
    {
      title: 'Статья 3',
      description: 'Ещё описание',
      date: '12 апреля 2026',
      image: 'selection.png'
    }
  ];
}
