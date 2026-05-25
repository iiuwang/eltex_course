import { ChangeDetectionStrategy, Component, computed,inject,OnInit } from '@angular/core';
import { MainPost } from '../../components/main-post/main-post';
import { RouterLink } from "@angular/router";
import { ARTICLES_SERVICE } from '../../../services/articles/articles-service.token';
import { ArticlesStoreService } from '../../../services/articles/articles-store.service';
import { WorkItem, HobbyItem } from '../../../types/main-page';
import { AppAboutMe } from '../../components/app-about-me/app-about-me';
import { AppSkills } from '../../components/app-skills/app-skills';
import { AppWork } from '../../components/app-work/app-work';
import { AppHobby } from '../../components/app-hobby/app-hobby';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MainPost,RouterLink,AppAboutMe,AppSkills,AppWork,AppHobby],
  templateUrl: './main-page.html' ,
  styleUrl: './main-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage implements OnInit { 
  private readonly store = inject(ArticlesStoreService);
  private readonly articles = inject(ARTICLES_SERVICE);

  protected readonly latestPosts = computed(() =>
    this.store.posts().slice(0, 2),
  );

  protected readonly hasPosts = computed(() => this.store.posts().length > 0);
  
  protected readonly skills: string[] = ['HTML5','Python','JavaScript','CSS','R','C++'];
  
  protected readonly career = {
    title: 'Моя карьера',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolore quisquam assumenda asperiores.',
  };

  protected readonly works: WorkItem[] = [
    {
      icon: 'work_icon1.png',
      company: 'ООО "CORTEL" - (2025 - по настоящее время)',
      jobName: 'Оператор технической поддержки',
      description:
        'Круглосуточный мониторинг IT-инфраструктуры и облачных сервисов, оперативная обработка и первичная диагностика инцидентов, взаимодействие с техническими специалистами и сопровождение инцидентов до их полного устранения',
    },
    {
      icon: 'work_icon2.png',
      company: 'ООО "Алгоритмика" (2024 - 2025)',
      jobName: 'Преподаватель',
      description:
        'Обучение школьников языку программирования Python и Scratch',
    },
  ];

  protected readonly hobbyIntro = {
    title: 'Мои хобби',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolore quisquam assumenda asperiores.',
  };

  protected readonly hobbies: HobbyItem[] = [
    {
      image: 'hobby1.png',
      alt: 'Фото хобби',
      title: 'Hobby project name',
      description:
        'Duis nisi do exercitation in irure aliqua commodo nisi eu id reprehenderit dolore fugiat consectetur irure labore est ea.',
    },
    { image: 'hobby2.png', alt: 'Фото хобби' },
    { image: 'selection.png', alt: 'Фото хобби' },
    { image: 'selection.png', alt: 'Фото хобби' },
  ];


  ngOnInit(): void {
    this.loadArticlesIfNeeded();
  }
  
  private loadArticlesIfNeeded(): void {
    if (this.store.posts().length > 0) {
      return;
    }
    const page = this.store.activePage();
    this.articles.getArticles(page).subscribe((result) => {
      this.store.setPosts(result.allPosts);
      this.store.setTotal(result.total);
      this.store.setActivePage(page);
    });
  }
    
    
}
