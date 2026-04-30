import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainPost } from '../../components/main-post/main-post';
import { RouterLink } from "@angular/router";
import { Post } from '../../../types/post';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MainPost,RouterLink],
  templateUrl: './main-page.html' ,
  styleUrl: './main-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class MainPage { 
    protected posts: Post[] = [
      {
        title: 'Как создать адаптивный дизайн за 30 минут',
        description: 'В этой статье я расскажу о ключевых принципах создания мобильных интерфейсов, которые одинаково хорошо выглядят на всех устройствах. Вы узнаете о медиа-запросах, гибких сетках и практических примерах кода, которые можно использовать прямо сейчас.',
        date: '5 марта 2026',
        image: "selection.png"
      },

      {
        title: 'Основы адаптивного веб-дизайна',
        description: 'Рассказываю о базовых принципах адаптивной верстки и делюсь простыми примерами, которые помогают сайту корректно отображаться на любом экране.',
        date: '12 марта 2026',
        image: "selection.png"
      }
    ]
}
