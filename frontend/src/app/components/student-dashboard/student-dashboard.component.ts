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
      <h2>Student Dashboard 🎓</h2>

      <button
        [class.active]="section==='profile'"
        (click)="section='profile'">
        👤 Profile
      </button>

      <button
        [class.active]="section==='results'"
        (click)="section='results'">
        📊 Previous Attempts
      </button>

      <button
        [class.active]="section==='notifications'"
        (click)="section='notifications'">
        🔔 Notifications
      </button>

      <button
        [class.active]="section==='quiz'"
        (click)="section='quiz'">
        🚀 List of Quizzes
      </button>
    </aside>

    <!-- CONTENT -->
    <main class="content">

      <!-- PROFILE -->
      <div *ngIf="section==='profile'">
        <h2>👤 Profile</h2>
        <p><b>Name:</b> Student</p>
        <p><b>Email:</b> student@email.com</p>
      </div>

      <!-- RESULTS -->
      <div *ngIf="section==='results'">
        <h2>📊 Previous Results</h2>

        <table>
          <tr>
            <th>Subject</th>
            <th>Score</th>
          </tr>

          <tr>
            <td>DBMS</td>
            <td>80%</td>
          </tr>

          <tr>
            <td>OS</td>
            <td>70%</td>
          </tr>
        </table>
      </div>

      <!-- NOTIFICATIONS -->
      <div *ngIf="section==='notifications'">
        <h2>🔔 Notifications</h2>

        <div class="card">
          <p>✅ New Quiz Available</p>
        </div>

        <div class="card">
          <p>📢 Result Published</p>
        </div>
      </div>

      <!-- QUIZ -->
      <div *ngIf="section==='quiz'">
        <h2>📋 List of Quizzes</h2>

        <div class="card">
          <p>Select a quiz to view details and attempt.</p>
        </div>
        
      </div>

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
    justify-content: flex-start;
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
    font-size: 15px;
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

  /* 📋 TABLE */
  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 20px;
  }

  th {
    background: #1e293b;
    color: white;
    padding: 14px;
    text-align: left;
  }

  td {
    padding: 14px;
    border-bottom: 1px solid #e2e8f0;
  }

  /* 📦 CARD */
  .card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    margin-top: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  /* 🚀 START BUTTON */
  .start-btn {
    margin-top: 15px;
    padding: 12px 18px;
    border: none;
    background: #6366f1;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
  }

  .start-btn:hover {
    background: #4f46e5;
  }
  `]
})
export class StudentDashboardComponent {
  section = 'profile';
}