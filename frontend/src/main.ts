import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoginComponent } from './app/components/login/login.component';
import { App } from './app/app';
import { authInterceptor } from './app/services/auth.interceptor';


bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
})
  .catch(err => console.error(err));