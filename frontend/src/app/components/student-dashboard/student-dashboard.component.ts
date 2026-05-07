import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],

  template: `
    <div class="layout">
      <!-- SIDEBAR -->
      <aside class="sidebar">
        <h2>Student Panel</h2>

        <button (click)="section = 'profile'">Profile</button>
        <button (click)="section = 'results'">Previous Attempts</button>
        <button (click)="section = 'notifications'">Notifications</button>
        <button (click)="section = 'quiz'">Start Quiz</button>
      </aside>

      <!-- CONTENT -->
      <main class="content">
        <div *ngIf="section === 'profile'">
          <h2>👤 Profile</h2>
          <p>Name: {{ user?.username }}</p>
          <p>Role: {{ user?.role }}</p>
        </div>
        <div *ngIf="section === 'results'">
          <h2>📊 Previous Results</h2>
          <p>DBMS - 80%</p>
          <p>OS - 70%</p>
        </div>

        <div *ngIf="section === 'notifications'">
          <h2>🔔 Notifications</h2>
          <p>New Quiz Available</p>
          <p>Result Published</p>
        </div>

        <div *ngIf="section === 'quiz'">
          <h2>🚀 Start Quiz</h2>
          <p>Select subject and start</p>
        </div>
      </main>
    </div>
  `,

  styles: [
    `
      .layout {
        display: flex;
        height: 100vh;
      }

      .sidebar {
        width: 250px;
        background: #1e293b;
        color: white;
        padding: 20px;
      }

      .sidebar button {
        display: block;
        width: 100%;
        margin: 10px 0;
        padding: 10px;
        background: #334155;
        border: none;
        color: white;
        cursor: pointer;
      }

      .content {
        flex: 1;
        padding: 20px;
        background: #f1f5f9;
      }
    `,
  ],
})
export class StudentDashboardComponent {
  section = 'profile';

  user: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const id = localStorage.getItem('userId');

    this.http.get(`http://localhost:5000/api/auth/profile/${id}`).subscribe((res: any) => {
      this.user = res;
      console.log(res);
    });
  }
}
