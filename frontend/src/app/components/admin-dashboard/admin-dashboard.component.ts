import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { ProfileComponent } from './profile/profile.component';
import { StudentComponent } from './student-management/student-management.component';
import { ReportsComponent } from './report/report.component';

=======
import { CreateQuizComponent } from './quiz-management/create-quiz';
import { QuizListComponent } from './quiz-management/quiz-list';
>>>>>>> 1dbbcb7a5d70d11a78e60eabe722f561d24400e3

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FormsModule,  ProfileComponent, StudentComponent, ReportsComponent
    ],
=======
  imports: [CommonModule, FormsModule, CreateQuizComponent, QuizListComponent],
>>>>>>> 1dbbcb7a5d70d11a78e60eabe722f561d24400e3

  template: `
  <div class="layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2>Admin Dashboard 👑</h2>

<<<<<<< HEAD
      <button (click)="section='profile'">Profile</button>

      <button (click)="section='students'">
        Manage Students
      </button> 

      <button (click)="section='quiz'">Quiz Management</button>

      <button (click)="section='reports'">Reports</button>
      
=======
      <button 
  [class.active]="section==='profile'" 
  (click)="openSection('profile')">
  👤 Profile
</button>

<button 
  [class.active]="section==='students'" 
  (click)="loadStudents(); openSection('students')">
  👨‍🎓 Manage Students
</button>

      <button (click)="toggleQuizMenu()">
  📚 Quiz Management 
  <span class="arrow" [class.rotate]="showQuizMenu">▼</span>
</button>

<div *ngIf="showQuizMenu" class="submenu">
  <button 
  [class.active]="section==='createQuiz'" 
  (click)="openSection('createQuiz')">
  ➕ Create Quiz
</button>

<button 
  [class.active]="section==='quizList'" 
  (click)="openSection('quizList')">
  📋 List of Quizzes
</button>
</div>

      <button 
  [class.active]="section==='reports'" 
  (click)="loadReports(); openSection('reports')">
  📊 Reports
</button>
>>>>>>> 1dbbcb7a5d70d11a78e60eabe722f561d24400e3
    </aside>

    <!-- CONTENT -->
    <main class="content">

      <!-- PROFILE -->
      <div *ngIf="section==='profile'"></div>

      <!-- STUDENTS -->
      <div *ngIf="section==='students'"></div>

      <!-- QUIZ -->
      <app-create-quiz *ngIf="section==='createQuiz'"></app-create-quiz>
      <app-quiz-list *ngIf="section==='quizList'"></app-quiz-list>

      <!-- REPORTS -->
      <div *ngIf="section==='reports'"></div>

<<<<<<< HEAD
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
    
=======
    </main>
  </div>
>>>>>>> 1dbbcb7a5d70d11a78e60eabe722f561d24400e3
  `,

  styles: [`
  /* 🔥 MAIN LAYOUT */
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* ✅ SIDEBAR (NO FIXED NOW) */
.sidebar {
  width: 250px;
  background: #020617;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;   /* 🔥 IMPORTANT (prevent collapse) */
}

/* ✅ CONTENT */
.content {
  flex: 1;
  padding: 20px;
  background: #f8fafc;
  overflow-y: auto;   /* 🔥 SCROLL FIX */
}

/* 🔘 SIDEBAR BUTTONS */
.sidebar button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0;
  padding: 12px;
  background: #1e293b;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-align: left;
}

/* ✨ Hover */
.sidebar button:hover {
  background: #334155;
}

/* ✅ Active */
.sidebar button.active {
  background: #6366f1;
  font-weight: bold;
}

/* 📂 Submenu */
.submenu {
  margin-left: 10px;
  border-left: 2px solid #475569;
  padding-left: 10px;
  animation: fadeIn 0.3s ease;
}

/* 🔽 Arrow */
.arrow {
  transition: transform 0.3s;
}

.arrow.rotate {
  transform: rotate(180deg);
}

/* ✨ Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
<<<<<<< HEAD


  /* =========================
   RESPONSIVE SIDEBAR
========================= */

@media(max-width:768px){

  .layout{
    flex-direction: column;
    height: auto;
  }

  .sidebar{
    width: 100%;
    display: flex;
    align-items: center;
    overflow-x: auto;
    gap: 10px;
    padding: 15px;
    white-space: nowrap;
  }

  .sidebar h2{
    font-size: 18px;
    margin-right: 15px;
  }

  .sidebar button{
    min-width: 160px;
    margin: 0;
    border-radius: 8px;
    padding: 12px;
  }

  .content{
    padding: 15px;
  }

  table{
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

=======
  to {
    opacity: 1;
    transform: translateY(0);
  }
>>>>>>> 1dbbcb7a5d70d11a78e60eabe722f561d24400e3
}
  `]
})
export class AdminDashboardComponent implements OnInit {

  section = 'profile';

  admin: any = {};
  students: any[] = [];
  quizzes: any[] = [];

  quizTitle = '';

  API = 'http://localhost:5000/api';

  constructor(
  private http: HttpClient) { }

<<<<<<< HEAD
  
=======
  ngOnInit() {
    this.loadProfile();
    this.loadQuizzes();
  }


  // 🔹 PROFILE
  loadProfile() {
    const token = localStorage.getItem('token');
    console.log("TOKEN:", token);

    this.http.get(`${this.API}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (res) => {
        console.log("PROFILE DATA:", res);
        this.admin = res;
      },
      error: (err) => {
        console.log("ERROR:", err);
      }
    });
  }

  // 🔹 STUDENTS
  loadStudents() {
    this.section = 'students';
    this.http.get(`${this.API}/admin/students`)
      .subscribe((res: any) => this.students = res);
  }

  deleteStudent(id: string) {
    this.http.delete(`${this.API}/admin/student/${id}`)
      .subscribe(() => this.loadStudents());
  }

>>>>>>> 1dbbcb7a5d70d11a78e60eabe722f561d24400e3
  // 🔹 QUIZ
  openSection(sec: string) {
    this.section = sec;

    if (sec === 'quizList') {
      this.loadQuizzes(); // 🔥 ADD THIS
    }

    if (sec === 'createQuiz' || sec === 'quizList') {
      this.showQuizMenu = true;
    } else {
      this.showQuizMenu = false;
    }
  }

  loadQuizzes() {
    this.http.get(`${this.API}/quiz`)
      .subscribe((res: any) => this.quizzes = res);
  }

  showQuizMenu = false;

  toggleQuizMenu() {
    this.showQuizMenu = !this.showQuizMenu;
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

<<<<<<< HEAD


}
=======
  // 🔹 REPORTS
  loadReports() {
    this.section = 'reports';
    this.http.get(`${this.API}/admin/reports`)
      .subscribe((res: any) => this.reports = res);
  }
}
>>>>>>> 1dbbcb7a5d70d11a78e60eabe722f561d24400e3
