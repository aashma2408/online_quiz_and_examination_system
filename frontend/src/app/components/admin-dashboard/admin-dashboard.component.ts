import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],

  template: `
  <div class="layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2>Admin Dashboard 👑</h2>

      <button (click)="section='profile'">Profile</button>
      <button (click)="loadStudents()">Manage Students</button>
      <button (click)="section='quiz'">Quiz Management</button>
      <button (click)="loadReports()">Reports</button>
    </aside>

    <!-- CONTENT -->
    <main class="content">

      <!-- PROFILE -->
      <div *ngIf="section==='profile'">
        <h2>👤 Profile</h2>
        <p><b>Username:</b> {{admin?.username}}</p>
        <p><b>Role:</b> {{admin?.role}}</p>
      </div>

      <!-- STUDENTS -->
      <div *ngIf="section==='students'">
        <h2>👨‍🎓 Manage Students</h2>

        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>

          <tr *ngFor="let student of students">
            <td>{{student.name}}</td>
            <td>{{student.email}}</td>
            <td>
              <button (click)="deleteStudent(student._id)">Delete</button>
            </td>
          </tr>
        </table>
      </div>

      <!-- QUIZ -->
      <div *ngIf="section==='quiz'">
        <h2>📝 Quiz Management</h2>

        <input [(ngModel)]="quizTitle" placeholder="Quiz Title">
        <button (click)="createQuiz()">Create</button>

        <ul>
          <li *ngFor="let q of quizzes">
            {{q.title}}
            <button (click)="editQuiz(q)">Edit</button>
            <button (click)="deleteQuiz(q._id)">Delete</button>
          </li>
        </ul>
      </div>

      <!-- REPORTS -->
      <div *ngIf="section==='reports'">
        <h2>📊 Reports</h2>

        <table>
          <tr>
            <th>Student</th>
            <th>Score</th>
          </tr>

          <tr *ngFor="let r of reports">
            <td>{{r.studentName}}</td>
            <td>{{r.score}}</td>
          </tr>
        </table>
      </div>

    </main>
  </div>
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
export class AdminDashboardComponent implements OnInit {

  section = 'profile';

  admin: any = {};
  students: any[] = [];
  quizzes: any[] = [];
  reports: any[] = [];

  quizTitle = '';

  API = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

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

  // 🔹 REPORTS
  loadReports() {
    this.section = 'reports';
    this.http.get(`${this.API}/admin/reports`)
      .subscribe((res: any) => this.reports = res);
  }
}