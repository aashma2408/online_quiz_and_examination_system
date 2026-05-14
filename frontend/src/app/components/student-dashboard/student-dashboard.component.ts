import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile/profile.component';
import { PreviousAttemptsComponent } from './previous-attempts/previous-attempts.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { StartQuizComponent } from './start-quiz/start-quiz.component';
@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, ProfileComponent,
    PreviousAttemptsComponent,
    NotificationsComponent,
    StartQuizComponent],

  template: `
  <div class="layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2>Student Panel 🎓</h2>

      <button (click)="section='profile'">Profile</button>
      <button (click)="section='results'">Previous Attempts</button>
      <button (click)="section='notifications'">Notifications</button>
      <button (click)="section='quiz'">Start Quiz</button>
    </aside>

    <!-- CONTENT -->
    <main class="content">

      <app-profile *ngIf="section==='profile'"></app-profile>

      <app-previous-attempts
      *ngIf="section==='results'">
      </app-previous-attempts>

      <app-notifications
      *ngIf="section==='notifications'">
      </app-notifications>

      <app-start-quiz
      *ngIf="section==='quiz'">
      </app-start-quiz>
    </main>
  </div>
  `,

  styles: [`

  *{
    font-family: Arial;
  }

  .layout{
    display:flex;
    min-height:100vh;
    background:#f1f5f9;
  }

  /* SIDEBAR */
  .sidebar{
    width:250px;
    background:#0f172a;
    padding:20px;
    color:white;
  }

  .sidebar h2{
    margin-bottom:30px;
  }

  .sidebar button{
    width:100%;
    padding:12px;
    margin-bottom:12px;
    border:none;
    background:#1e293b;
    color:white;
    cursor:pointer;
    border-radius:6px;
    font-size:15px;
  }

  .sidebar button:hover{
    background:#334155;
  }

  /* CONTENT */
  .content{
    flex:1;
    padding:40px;
  }

  /* PROFILE CARD */
  .profile-card{
    background:white;
    border-radius:20px;
    padding:35px;
    display:flex;
    gap:40px;
    box-shadow:0 5px 20px rgba(0,0,0,0.08);
  }

  .left{
    width:280px;
    text-align:center;
    border-right:1px solid #ddd;
    padding-right:30px;
  }

  .profile-img{
    width:180px;
    height:180px;
    border-radius:50%;
    object-fit:cover;
    border:5px solid #6366f1;
  }

  .left h2{
    margin-top:20px;
    font-size:32px;
  }

  .role-badge{
    margin-top:20px;
    display:inline-block;
    padding:10px 25px;
    background:#e0e7ff;
    color:#4338ca;
    border-radius:30px;
    font-weight:bold;
  }

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

  section = 'profile';

  ngOnInit() {
    const studentData = localStorage.getItem('student');
    console.log("🎯 Dashboard - Student data:", studentData);
  }
}