import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
// import { TakeQuizComponent } from './components/take-quiz/take-quiz.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // { path: 'quiz', component: TakeQuizComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '' }
];