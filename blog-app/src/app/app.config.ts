import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import {ARTICLES_SERVICE} from './services/articles/articles-service.token';
import { ArticlesServiceImpl } from './services/articles/articles.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
      })
    ),
    { provide: ARTICLES_SERVICE, useClass: ArticlesServiceImpl},
  ]
};
