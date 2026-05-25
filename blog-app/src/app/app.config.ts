import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import {ARTICLES_SERVICE} from './services/articles/articles-service.token';
import { ArticlesServiceImpl } from './services/articles/articles.service';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ArticlesApiService } from './services/articles/articles-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
      })
    ),
    { provide: ARTICLES_SERVICE,
      useClass: environment.useBackend ? ArticlesApiService : ArticlesServiceImpl,
    },
  ]
};
