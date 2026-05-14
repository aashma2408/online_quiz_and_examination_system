<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component } from '@angular/core';
>>>>>>> 1dbbcb7a5d70d11a78e60eabe722f561d24400e3
import { CommonModule } from '@angular/common';
import { StudentQuizList } from './List of Quizzes/list-Of-Quizzes';
@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, StudentQuizList],

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
        <app-student-quiz-list></app-student-quiz-list>
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

<<<<<<< HEAD
  .layout{
    display:flex;
    min-height:100vh;
    background:#f1f5f9;
=======
  /* ✅ SIDEBAR */
  .sidebar {
    width: 250px;
    background: #020617;
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
>>>>>>> 1dbbcb7a5d70d11a78e60eabe722f561d24400e3
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
<<<<<<< HEAD

  .right{
    flex:1;
  }

  .title{
    margin-bottom:30px;
    color:#1e293b;
  }

  .info-grid{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:20px;
  }

  .info-box{
    background:#f3f4f6;
    padding:25px;
    border-radius:15px;
  }

  .info-box span{
    color:#6b7280;
    font-size:14px;
  }

  .info-box h3{
    margin-top:10px;
    font-size:28px;
    color:#111827;
  }

  /* RESULTS */
  .result-box{
    background:white;
    padding:20px;
    border-radius:10px;
    margin-top:15px;
    display:flex;
    justify-content:space-between;
  }

  /* NOTIFICATIONS */
  .notify{
    background:white;
    padding:15px;
    margin-top:15px;
    border-left:5px solid #6366f1;
    border-radius:5px;
  }

  /* QUIZ */
  .quiz-btn{
    margin-top:20px;
    padding:14px 30px;
    border:none;
    background:#6366f1;
    color:white;
    border-radius:8px;
    cursor:pointer;
    font-size:16px;
  }


 /* =========================
   RESPONSIVE DESIGN
========================= */

@media(max-width:768px){

  .layout{
    flex-direction:column;
    min-height:auto;
  }

  .sidebar{
    width:100%;
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    gap:10px;
    padding:15px;
  }

  .sidebar h2{
    width:100%;
    text-align:center;
    margin-bottom:15px;
    font-size:22px;
  }

  .sidebar button{
    width:auto;
    min-width:140px;
    margin-bottom:0;
    padding:10px;
    font-size:14px;
  }

  .content{
    padding:15px;
  }

}

  `]
})
export class StudentDashboardComponent {

=======
  `]
})
export class StudentDashboardComponent {
>>>>>>> 1dbbcb7a5d70d11a78e60eabe722f561d24400e3
  section = 'profile';
}