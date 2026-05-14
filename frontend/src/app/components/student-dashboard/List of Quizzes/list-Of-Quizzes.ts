import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-student-quiz-list',
  standalone: true,
  imports: [CommonModule],

  template: `
  <div class="page">

    <div class="topbar">
      <h1>🎓 Available Quizzes</h1>

      <div class="count">
        Total Quizzes: <span>{{ quizzes.length }}</span>
      </div>
    </div>

    <!-- EMPTY -->
    <div class="empty" *ngIf="quizzes.length === 0">
      <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png">

      <h2>No Quiz Available</h2>

      <p>Please wait for admin to create quizzes 🚀</p>
    </div>

    <!-- QUIZ LIST -->
    <div class="quiz-grid">

      <div class="quiz-card"
        *ngFor="let quiz of quizzes; trackBy: trackByQuiz">

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

          <button class="attempt-btn"
            (click)="attemptQuiz(quiz._id)">
            🚀 Attempt Quiz
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

.page{
  padding:24px;
  background:#f8fafc;
  min-height:100vh;
}

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

.quiz-grid{
  display:flex;
  flex-direction:column;
  gap:18px;
}

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

.actions{
  display:flex;
  gap:12px;
}

button{
  border:none;
  padding:10px 16px;
  border-radius:10px;
  font-size:14px;
  font-weight:600;
  cursor:pointer;
  transition:0.25s;
}

.attempt-btn{
  background:#10b981;
  color:white;
}

.attempt-btn:hover{
  background:#059669;
}

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

export class StudentQuizList implements OnInit {

  quizzes: any[] = [];

  API = 'http://localhost:5000/api/quiz';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    const token = localStorage.getItem('token');

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

    const token = localStorage.getItem('token');

    this.http.get<any[]>(this.API, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({

      next: (res) => {

        console.log("QUIZ LIST:", res);

        this.quizzes = [...res];

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.log(err);
      }
    });
  }

  attemptQuiz(id: string) {

    this.router.navigate([`/attempt-quiz/${id}`]);

  }
}