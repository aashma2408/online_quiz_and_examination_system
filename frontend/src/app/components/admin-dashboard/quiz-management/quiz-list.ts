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
      <h1>📋 List of Quizzes</h1>
      
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
  font-family:'Segoe UI',sans-serif;
}

/* PAGE */
.page{
  padding:24px;
  background:#f8fafc;
  min-height:100vh;
}

/* TOPBAR */
.topbar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:24px;
  flex-wrap:wrap;
  gap:15px;
}

.topbar h1{
  margin:0;
  font-size:30px;
  color:#334155;
  font-weight:700;
}

/* COUNT */
.count{
  background:white;
  padding:10px 18px;
  border-radius:12px;
  border:1px solid #e2e8f0;
  font-weight:600;
  color:#64748b;
}

.count span{
  color:#6366f1;
  font-size:18px;
}

/* ✅ SINGLE LINE QUIZ LIST */
.quiz-grid{
  display:flex;
  flex-direction:column;
  gap:18px;
}

/* CARD */
.quiz-card{
  background:white;
  border:1px solid #e2e8f0;
  border-radius:16px;
  padding:18px 22px;

  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:20px;

  transition:0.25s ease;
}

.quiz-card:hover{
  box-shadow:0 8px 20px rgba(0,0,0,0.05);
  transform:translateY(-2px);
}

/* LEFT */
.card-top{
  display:flex;
  align-items:center;
  gap:16px;
  min-width:250px;
}

.quiz-icon{
  width:50px;
  height:50px;
  border-radius:12px;
  background:#eef2ff;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:24px;
}

.card-top h2{
  margin:0;
  font-size:20px;
  color:#1e293b;
}

.time{
  margin-top:4px;
  font-size:14px;
  color:#64748b;
}

/* CENTER INFO */
.info{
  display:flex;
  align-items:center;
  gap:12px;
  flex-wrap:wrap;
}

.badge{
  background:#f1f5f9;
  color:#475569;
  padding:7px 14px;
  border-radius:30px;
  font-size:13px;
  font-weight:600;
}

.negative{
  background:#fee2e2;
  color:#dc2626;
}

/* RIGHT BUTTONS */
.actions{
  display:flex;
  gap:12px;
}

/* BUTTONS */
button{
  border:none;
  padding:10px 16px;
  border-radius:10px;
  font-size:14px;
  font-weight:600;
  cursor:pointer;
  transition:0.25s;
}

/* VIEW */
.view-btn{
  background:#6366f1;
  color:white;
}

.view-btn:hover{
  background:#4f46e5;
}

/* DELETE */
.delete-btn{
  background:#ef4444;
  color:white;
}

.delete-btn:hover{
  background:#dc2626;
}

/* EMPTY */
.empty{
  text-align:center;
  margin-top:80px;
  color:#64748b;
}

.empty img{
  width:120px;
  margin-bottom:18px;
  opacity:0.8;
}

.empty h2{
  margin:0;
  font-size:28px;
  color:#334155;
}

.empty p{
  margin-top:10px;
  font-size:15px;
}

/* RESPONSIVE */
@media(max-width:900px){

  .quiz-card{
    flex-direction:column;
    align-items:flex-start;
  }

  .actions{
    width:100%;
  }

  .actions button{
    flex:1;
  }
}

`]
})

export class QuizList implements OnInit {

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