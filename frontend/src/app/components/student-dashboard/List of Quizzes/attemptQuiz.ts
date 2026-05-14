import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-attempt-quiz',
    standalone: true,
    imports: [CommonModule, FormsModule],

    template: `

<div class="page">

  <!-- LOADING -->

  <div *ngIf="loading" class="loading">
    Loading Quiz...
  </div>

  <!-- ERROR -->

  <div *ngIf="errorMessage" class="error">
    {{ errorMessage }}
  </div>

  <!-- QUIZ -->

  <ng-container *ngIf="!loading && quiz">

    <!-- HEADER -->

    <div class="header-card">

      <div class="left">

        <div class="icon">📝</div>

        <div>

          <h1>{{ quiz?.title }}</h1>

          <p>
            ⏱ {{ quiz?.timeLimit }} Minutes
          </p>

        </div>

      </div>

      <div class="stats">

        <div class="badge">
          ❓ {{ quiz?.questions?.length || 0 }} Questions
        </div>

        <div class="badge negative">
          🚫 Negative: {{ quiz?.negativeMark }}
        </div>

      </div>

    </div>

    <!-- QUESTIONS -->

    <div
      class="question-card"
      *ngFor="let q of quiz?.questions; let i = index">

      <!-- QUESTION -->

      <div class="question-header">

        <div class="q-number">
          Q{{ i + 1 }}
        </div>

        <h2>
          {{ q?.questionText }}
        </h2>

      </div>

      <!-- OPTIONS -->

      <div class="options">

        <label
          class="option"
          *ngFor="let opt of q?.options; let j = index">

          <input
            type="radio"
            [name]="'question'+i"
            [value]="opt"
            [(ngModel)]="selectedAnswers[i]"
          >

          <span class="option-letter">
            {{ letters[j] }}
          </span>

          <span class="option-text">
            {{ opt }}
          </span>

        </label>

      </div>

    </div>

    <!-- SUBMIT -->

    <div class="submit-section">

      <button
        class="submit-btn"
        (click)="submitQuiz()">

        🚀 Submit Quiz

      </button>

    </div>

  </ng-container>

</div>

`,

    styles: [`

*{
  box-sizing:border-box;
  font-family:'Segoe UI',sans-serif;
}

.page{
  padding:30px;
  background:#f1f5f9;
  min-height:100vh;
  color:#111827;
}

/* LOADING */

.loading,
.error{
  font-size:22px;
  font-weight:600;
  color:black;
  padding:20px;
}

/* HEADER */

.header-card{
  background:white;
  border-radius:20px;
  padding:24px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-wrap:wrap;
  gap:20px;
  margin-bottom:28px;
  border:1px solid #e2e8f0;
  box-shadow:0 4px 12px rgba(0,0,0,0.05);
}

.left{
  display:flex;
  align-items:center;
  gap:18px;
}

.icon{
  width:70px;
  height:70px;
  border-radius:18px;
  background:#eef2ff;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:32px;
}

h1{
  margin:0;
  color:#111827;
}

p{
  margin-top:6px;
  color:#6b7280;
}

.stats{
  display:flex;
  gap:12px;
}

.badge{
  background:#eef2ff;
  color:#4338ca;
  padding:10px 16px;
  border-radius:30px;
  font-weight:600;
}

.negative{
  background:#fee2e2;
  color:#dc2626;
}

/* QUESTION CARD */

.question-card{
  background:white;
  border-radius:18px;
  padding:24px;
  margin-bottom:22px;
  border:1px solid #e2e8f0;
  box-shadow:0 4px 10px rgba(0,0,0,0.04);
}

.question-header{
  display:flex;
  gap:16px;
  margin-bottom:22px;
  align-items:flex-start;
}

.q-number{
  min-width:45px;
  height:45px;
  border-radius:12px;
  background:#6366f1;
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
}

.question-header h2{
  margin:0;
  color:#111827;
  font-size:22px;
}

/* OPTIONS */

.options{
  display:grid;
  gap:14px;
}

.option{
  display:flex;
  align-items:center;
  gap:14px;
  padding:14px 16px;
  border-radius:14px;
  background:#f8fafc;
  border:1px solid #e2e8f0;
  cursor:pointer;
  transition:0.25s;
}

.option:hover{
  background:#eef2ff;
}

.option input{
  width:18px;
  height:18px;
  cursor:pointer;
}

.option-letter{
  width:34px;
  height:34px;
  border-radius:10px;
  background:#6366f1;
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
}

.option-text{
  color:#111827;
  font-size:16px;
}

/* SUBMIT */

.submit-section{
  margin-top:30px;
  display:flex;
  justify-content:center;
}

.submit-btn{
  border:none;
  background:#10b981;
  color:white;
  padding:16px 28px;
  border-radius:14px;
  font-size:18px;
  font-weight:700;
  cursor:pointer;
  transition:0.25s;
}

.submit-btn:hover{
  background:#059669;
  transform:translateY(-2px);
}

/* RESPONSIVE */

@media(max-width:768px){

  .header-card{
    flex-direction:column;
    align-items:flex-start;
  }

  .stats{
    width:100%;
    flex-wrap:wrap;
  }

  .question-header{
    flex-direction:column;
  }
}

`]
})

export class AttemptQuiz implements OnInit {

    quiz: any = null;

    loading = true;

    errorMessage = '';

    selectedAnswers: any[] = [];

    letters = ['A', 'B', 'C', 'D'];

    API = 'http://localhost:5000/api/quiz';

    quizId = '';

    attemptQuiz(id: string) {

        console.log("QUIZ ID:", id);

        this.router.navigate([`/attempt-quiz/${id}`]);

    }

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {

        this.quizId = this.route.snapshot.paramMap.get('id') || '';

        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        this.http.get<any>(
            `${this.API}/${this.quizId}`,
            { headers }
        ).subscribe({

            next: (data) => {

                console.log('QUIZ DATA:', data);

                this.quiz = {
                    ...data,
                    questions: data.questions || []
                };

                this.loading = false;

                this.cdr.detectChanges();
            },

            error: (err) => {

                console.error(err);

                this.errorMessage =
                    err?.error?.message || 'Failed to load quiz';

                this.loading = false;

                this.cdr.detectChanges();
            }
        });
    }

    submitQuiz() {

        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        const payload = {
            answers: this.selectedAnswers
        };

        this.http.post<any>(
            `${this.API}/${this.quizId}/submit`,
            payload,
            { headers }
        ).subscribe({

            next: (res) => {

                alert(

                    `Quiz Submitted Successfully ✅

Score: ${res.score}

Correct Answers: ${res.correct}

Wrong Answers: ${res.wrong}

Total Questions: ${res.total}`

                );

                this.router.navigate(['/student-dashboard']);
            },

            error: (err) => {

                console.log(err);

                alert('Failed To Submit Quiz');
            }
        });
    }
}