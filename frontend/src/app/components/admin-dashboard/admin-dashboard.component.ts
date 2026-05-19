import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { Profile } from './profile/profile';
import { StudentManagement } from './student-management/student-management';
import { Reports } from './report/report';
import { CreateQuiz } from './quiz-management/create-quiz';
import { QuizList } from './quiz-management/quiz-list';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Profile,
    StudentManagement,
    Reports,
    CreateQuiz,
    QuizList
  ],

  template: `
  <div class="layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">

      <h2>Admin Dashboard 👑</h2>

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

    </aside>
    

    <!-- CONTENT -->
    <main class="content">

      <!-- PROFILE -->
      <div *ngIf="section==='profile'">
        <app-profile></app-profile>
      </div>

      <!-- STUDENTS -->
      <div *ngIf="section==='students'">
        <app-student-management></app-student-management>
      </div>

      <!-- QUIZ -->
      <app-create-quiz *ngIf="section==='createQuiz'"></app-create-quiz>

      <app-quiz-list *ngIf="section==='quizList'"></app-quiz-list>

      <!-- REPORTS -->
      <app-reports *ngIf="section==='reports'"></app-reports>

      <!-- QUIZ LIST -->
      <ul *ngIf="section==='quizList'">
        <li *ngFor="let q of quizzes">

          {{ q.title }}

          <button (click)="editQuiz(q)">
            Edit
          </button>

          <button (click)="deleteQuiz(q._id)">
            Delete
          </button>

        </li>
      </ul>

    </main>

  </div>
  `,

  styles: [`
  /* 🔥 MAIN LAYOUT */
  .layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  /* ✅ SIDEBAR */
  .sidebar {
    width: 250px;
    background: #020617;
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  /* ✅ CONTENT */
  .content {
    flex: 1;
    padding: 20px;
    background: #f8fafc;
    overflow-y: auto;
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

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

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

  showQuizMenu = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadProfile();
    this.loadQuizzes();
  }

  // 🔹 PROFILE
  loadProfile() {

    const token = localStorage.getItem('token');

    console.log('TOKEN:', token);

    this.http.get(`${this.API}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (res) => {
        console.log('PROFILE DATA:', res);
        this.admin = res;
      },

      error: (err) => {
        console.log('ERROR:', err);
      }
    });
  }

  // 🔹 STUDENTS
  loadStudents() {

    this.section = 'students';

    this.http.get(`${this.API}/admin/students`)
      .subscribe((res: any) => {
        this.students = res;
      });
  }

  deleteStudent(id: string) {

    this.http.delete(`${this.API}/admin/student/${id}`)
      .subscribe(() => {
        this.loadStudents();
      });
  }

  // 🔹 QUIZ
  openSection(sec: string) {

    this.section = sec;

    if (sec === 'quizList') {
      this.loadQuizzes();
    }

    if (sec === 'createQuiz' || sec === 'quizList') {
      this.showQuizMenu = true;
    } else {
      this.showQuizMenu = false;
    }
  }

  loadQuizzes() {

    this.http.get(`${this.API}/quiz`)
      .subscribe((res: any) => {
        this.quizzes = res;
      });
  }

  toggleQuizMenu() {
    this.showQuizMenu = !this.showQuizMenu;
  }

  createQuiz() {

    this.http.post(`${this.API}/quiz`, {
      title: this.quizTitle
    }).subscribe(() => {

      this.quizTitle = '';
      this.loadQuizzes();
    });
  }

  editQuiz(q: any) {

    const newTitle = prompt('Edit quiz title', q.title);

    if (!newTitle) return;

    this.http.put(`${this.API}/quiz/${q._id}`, {
      title: newTitle
    }).subscribe(() => {
      this.loadQuizzes();
    });
  }

  deleteQuiz(id: string) {

    this.http.delete(`${this.API}/quiz/${id}`)
      .subscribe(() => {
        this.loadQuizzes();
      });
  }

  // 🔹 REPORTS
  loadReports() {

    this.section = 'reports';

    this.http.get(`${this.API}/admin/reports`)
      .subscribe((res: any) => {
        console.log('REPORTS:', res);
      });
  }
}