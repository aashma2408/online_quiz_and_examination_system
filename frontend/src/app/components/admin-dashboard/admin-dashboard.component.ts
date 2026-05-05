import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],

  template: `
  <div class="layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2>Admin Panel 👑</h2>

      <button (click)="section='profile'">Profile</button>
      <button (click)="section='students'">Manage Students</button>
      <button (click)="section='quiz'">Quiz Management</button>
      <button (click)="section='reports'">Reports</button>
      <button (click)="section='notifications'">Notifications</button>
    </aside>

    <!-- CONTENT -->
    <main class="content">

      <div *ngIf="section==='profile'">
        <h2>👤 Profile</h2>
      </div>

      <div *ngIf="section==='students'">
        <h2>👨‍🎓 Manage Students</h2>
      </div>

      <div *ngIf="section==='quiz'">
        <h2>📝 Quiz Management</h2>
        <p>Create / Edit / Delete Quiz</p>
      </div>

      <div *ngIf="section==='reports'">
        <h2>📊 Reports & Analytics</h2>
      </div>

      <div *ngIf="section==='notifications'">
        <h2>🔔 Send Notifications</h2>
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
  `]
})
export class AdminDashboardComponent {
  section = 'profile';
}