import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import {ARTICLES_SERVICE} from './services/articles/articles-service.token';
import { ArticlesServiceImpl } from './services/articles/articles.service';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
      })
    ),
    { provide: ARTICLES_SERVICE, useClass: ArticlesServiceImpl},
  ]
};
