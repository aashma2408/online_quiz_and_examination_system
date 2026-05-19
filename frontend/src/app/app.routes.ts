import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { AttemptQuiz } from './components/student-dashboard/List of Quizzes/attemptQuiz';
import { StudentQuizList } from './components/student-dashboard/List of Quizzes/list-Of-Quizzes';
export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'student', component: StudentDashboardComponent },
  { path: 'admin', component: AdminDashboardComponent },

  { path: 'attempt-quiz/:id', component: AttemptQuiz },
  { path: 'list-Of-Quizzes', component: StudentQuizList },

  {
    path: 'quiz/:id',
    loadComponent: () => import('./components/admin-dashboard/quiz-management/view-quiz')
      .then(m => m.QuizView)
  }
];