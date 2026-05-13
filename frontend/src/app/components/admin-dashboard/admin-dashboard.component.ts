import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { StudentComponent } from './student-management/student-management.component';
import { ReportsComponent } from './report/report.component';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,  ProfileComponent, StudentComponent, ReportsComponent
    ],

  template: `

  <div class="layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2>Admin Dashboard 👑</h2>

      <button (click)="section='profile'">Profile</button>
      <button (click)="section='students'">
        Manage Students
      </button> 
      <button (click)="section='quiz'">Quiz Management</button>
      <button (click)="loadReports()">Reports</button>
    </aside>

    <!-- CONTENT -->
    <main class="content">

      <app-profile *ngIf="section==='profile'"></app-profile>

      <app-student *ngIf="section==='students'"></app-student>

    <!-- QUIZ -->
    <div *ngIf="section==='quiz'">
      <h2>📝 Quiz Management</h2>

      <input [(ngModel)]="quizTitle" placeholder="Quiz Title">
      <button (click)="createQuiz()">Create</button>

      <ul>
        <li *ngFor="let q of quizzes">
          {{q.title}}

          <button (click)="editQuiz(q)">Edit</button>

          <button (click)="deleteQuiz(q._id)">
             Delete
          </button>

        </li>
      </ul>
    </div>

    <app-reports *ngIf="section==='reports'"></app-reports>

  </main>
    
  `,

  styles: [`
  .layout {
    display: flex;
    height: 100vh;
  }

  .sidebar {
    width: 260px;
    background: #020617;
    color: white;
    padding: 20px;
  }

  .sidebar button {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    background: #1e293b;
    border: none;
    color: white;
    cursor: pointer;
  }

  .content {
    flex: 1;
    padding: 20px;
    background: #f8fafc;
  }

  table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 10px;
  }
  `]
})
export class AdminDashboardComponent  {

  section = 'profile';

  admin: any = {};
  students: any[] = [];
  quizzes: any[] = [];

  quizTitle = '';

  API = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  
  // 🔹 QUIZ
  loadQuizzes() {
    this.http.get(`${this.API}/quiz`)
      .subscribe((res: any) => this.quizzes = res);
  }

  createQuiz() {
    this.http.post(`${this.API}/quiz`, { title: this.quizTitle })
      .subscribe(() => {
        this.quizTitle = '';
        this.loadQuizzes();
      });
  }

  editQuiz(q: any) {
    const newTitle = prompt('Edit quiz title', q.title);
    if (!newTitle) return;

    this.http.put(`${this.API}/quiz/${q._id}`, { title: newTitle })
      .subscribe(() => this.loadQuizzes());
  }

  deleteQuiz(id: string) {
    this.http.delete(`${this.API}/quiz/${id}`)
      .subscribe(() => this.loadQuizzes());
  }

  
}
