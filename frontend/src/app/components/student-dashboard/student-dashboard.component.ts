import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile/profile';
import { StudentQuizList } from './List of Quizzes/list-Of-Quizzes';
import { Notifications } from './notifications/notifications';
import { PreviousAttempts } from './previous-attempts/previous-attempts';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule,
    ProfileComponent,
    StudentQuizList,
    Notifications,
    PreviousAttempts
  ],

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
        📋 List of Quizzes
      </button>

    </aside>

    <!-- CONTENT -->
    <main class="content">

      <!-- PROFILE -->
      <div *ngIf="section==='profile'">
        <app-profile></app-profile>
      </div>
  
      <!-- ATTEMPTS -->
      <div *ngIf="section==='results'">
        <app-previous-attempts></app-previous-attempts>
      </div>

      <!-- NOTIFICATIONS -->
      <div *ngIf="section==='notifications'">
        <app-notifications></app-notifications>
      </div>

      <!-- QUIZ -->
      <div *ngIf="section==='quiz'">
        <app-student-quiz-list></app-student-quiz-list>
      </div>

    </main>

  </div>
  `,

  styles: [`
  /* 🔥 MAIN LAYOUT */
  .layout {
    display: flex;
    min-height: 100vh;
    background: #f1f5f9;
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

  /* RIGHT SECTION */
  .right {
    flex: 1;
  }

  .title {
    margin-bottom: 30px;
    color: #1e293b;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 20px;
  }

  .info-box {
    background: #f3f4f6;
    padding: 25px;
    border-radius: 15px;
  }

  .info-box span {
    color: #6b7280;
    font-size: 14px;
  }

  .info-box h3 {
    margin-top: 10px;
    font-size: 28px;
    color: #111827;
  }

  /* RESULTS */
  .result-box {
    background: white;
    padding: 20px;
    border-radius: 10px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }

  /* NOTIFICATIONS */
  .notify {
    background: white;
    padding: 15px;
    margin-top: 15px;
    border-left: 5px solid #6366f1;
    border-radius: 5px;
  }

  /* QUIZ */
  .quiz-btn {
    margin-top: 20px;
    padding: 14px 30px;
    border: none;
    background: #6366f1;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
  }

  /* =========================
     RESPONSIVE DESIGN
  ========================= */

  @media(max-width:768px){

    .layout{
      flex-direction: column;
      min-height: auto;
    }

    .sidebar{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      padding: 15px;
    }

    .sidebar h2{
      width: 100%;
      text-align: center;
      margin-bottom: 15px;
      font-size: 22px;
    }

    .sidebar button{
      width: auto;
      min-width: 140px;
      margin-bottom: 0;
      padding: 10px;
      font-size: 14px;
    }

    .content{
      padding: 15px;
    }
  }
  `]
})

export class StudentDashboardComponent {

  section = 'profile';

}