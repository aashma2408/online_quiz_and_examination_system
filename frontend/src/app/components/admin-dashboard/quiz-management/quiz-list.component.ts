import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule],

  template: `
  <div class="page">

    <div class="topbar">
      <h1>📋 Quiz Management</h1>
      
      <div class="count">
        Total Quizzes: <span>{{ quizzes.length }}</span>
      </div>
    </div>

    <!-- EMPTY STATE -->
    <div class="empty" *ngIf="quizzes.length === 0">
      <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png">
      <h2>No Quiz Found</h2>
      <p>Create your first quiz 🚀</p>
    </div>

    <!-- QUIZ LIST -->
    <div class="quiz-grid">

<div class="quiz-card" *ngFor="let quiz of quizzes; trackBy: trackByQuiz">
        <div class="card-top">
          <div class="quiz-icon">📝</div>

          <div>
            <h2>{{ quiz.title }}</h2>

            <p class="time">
              ⏱ {{ quiz.timeLimit }} Minutes
            </p>
          </div>
        </div>

        <div class="info">

          <div class="badge">
            ❓ {{ quiz.questions?.length || 0 }} Questions
          </div>

          <div class="badge negative">
            🚫 Negative: {{ quiz.negativeMark }}
          </div>

        </div>

        <div class="actions">

          <button class="view-btn"
            (click)="viewQuiz(quiz._id)">
            👁 View
          </button>

          <button class="delete-btn"
            (click)="deleteQuiz(quiz._id)">
            🗑 Delete
          </button>

        </div>

      </div>

    </div>

  </div>
  `,

  styles: [`

  *{
    box-sizing:border-box;
    font-family: 'Segoe UI', sans-serif;
  }

  .page{
    padding:30px;
    background:#f4f7fb;
    min-height:100vh;
  }

  .topbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:30px;
  }

  .topbar h1{
    font-size:34px;
    color:#1e293b;
    font-weight:700;
  }

  .count{
    background:white;
    padding:12px 20px;
    border-radius:12px;
    font-weight:600;
    box-shadow:0 4px 15px rgba(0,0,0,0.08);
  }

  .count span{
    color:#6c63ff;
    font-size:20px;
  }

  .quiz-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(320px,1fr));
    gap:25px;
  }

  .quiz-card{
    background:white;
    border-radius:22px;
    padding:24px;
    box-shadow:0 8px 25px rgba(0,0,0,0.08);
    transition:0.3s;
    position:relative;
    overflow:hidden;
  }

  .quiz-card:hover{
    transform:translateY(-6px);
    box-shadow:0 14px 35px rgba(0,0,0,0.12);
  }

  .quiz-card::before{
    content:'';
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:6px;
    background:linear-gradient(90deg,#6c63ff,#8b5cf6);
  }

  .card-top{
    display:flex;
    align-items:center;
    gap:16px;
    margin-bottom:20px;
  }

  .quiz-icon{
    width:60px;
    height:60px;
    border-radius:16px;
    background:#ede9fe;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:28px;
  }

  .card-top h2{
    margin:0;
    color:#111827;
    font-size:24px;
  }

  .time{
    margin-top:6px;
    color:#6b7280;
    font-size:15px;
  }

  .info{
    display:flex;
    gap:12px;
    flex-wrap:wrap;
    margin-bottom:24px;
  }

  .badge{
    background:#eef2ff;
    color:#4338ca;
    padding:8px 14px;
    border-radius:30px;
    font-size:14px;
    font-weight:600;
  }

  .negative{
    background:#fee2e2;
    color:#dc2626;
  }

  .actions{
    display:flex;
    gap:14px;
  }

  button{
    flex:1;
    border:none;
    padding:12px;
    border-radius:12px;
    font-size:15px;
    font-weight:600;
    cursor:pointer;
    transition:0.3s;
  }

  .view-btn{
    background:linear-gradient(90deg,#6366f1,#8b5cf6);
    color:white;
  }

  .view-btn:hover{
    opacity:0.9;
    transform:scale(1.03);
  }

  .delete-btn{
    background:#ef4444;
    color:white;
  }

  .delete-btn:hover{
    background:#dc2626;
    transform:scale(1.03);
  }

  .empty{
    text-align:center;
    margin-top:80px;
    color:#64748b;
  }

  .empty img{
    width:140px;
    margin-bottom:20px;
    opacity:0.8;
  }

  .empty h2{
    font-size:30px;
    margin-bottom:10px;
  }

  `]
})

export class QuizListComponent implements OnInit {

  quizzes: any[] = [];
  API = 'http://localhost:5000/api/quiz';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    const token = localStorage.getItem('token');

    console.log("TOKEN:", token);

    if (token) {
      this.loadQuizzes();
    } else {
      console.log("No token found");
    }
  }

  trackByQuiz(index: number, quiz: any) {
    return quiz._id;
  }

  loadQuizzes() {

    console.log("LOAD QUIZZES CALLED");

    const token = localStorage.getItem('token');

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    this.http.get('http://localhost:5000/api/quizzes', headers)
      .subscribe({
        next: (res: any) => {
          console.log("QUIZZES:", res);
          this.quizzes = res;
        },
        error: (err) => {
          console.log("ERROR:", err);
        }
      });

    this.http.get<any[]>(this.API, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({

      next: (res) => {

        console.log("QUIZ LIST:", res);

        this.quizzes = [...res];

        this.cdr.detectChanges();

        console.log("FINAL QUIZZES:", this.quizzes);
      },

      error: (err) => {
        console.log(err);
      }

    });
  }

  deleteQuiz(id: string) {

    const token = localStorage.getItem('token');

    this.http.delete(`${this.API}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe(() => {

      alert('Quiz Deleted Successfully ✅');

      this.loadQuizzes();

    });
  }

  viewQuiz(id: string) {
    this.router.navigate([`/quiz/${id}`]);
  }
}