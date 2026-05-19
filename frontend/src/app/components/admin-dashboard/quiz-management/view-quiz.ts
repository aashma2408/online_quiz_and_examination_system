import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-quiz-view',
  standalone: true,
  imports: [CommonModule],

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

  <!-- QUIZ CONTENT -->

  <ng-container *ngIf="!loading && quiz">

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

        <div
          class="option"
          *ngFor="let opt of q?.options; let j = index">

          <span class="option-letter">
            {{ letters[j] }}
          </span>

          <span class="option-text">
            {{ opt }}
          </span>

        </div>

      </div>

      <!-- ANSWER -->

      <div class="answer">

        ✅ Correct Answer:
        {{ q?.correctAnswer }}

      </div>

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

  .loading,
  .error{
    font-size:22px;
    font-weight:600;
    color:black;
    padding:20px;
  }

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

  .answer{
    margin-top:22px;
    padding:14px 18px;
    border-radius:12px;
    background:#ecfdf5;
    color:#065f46;
    font-weight:600;
  }

  `]
})

export class QuizView implements OnInit {

  quiz: any = null;

  loading = true;

  errorMessage = '';

  letters = ['A', 'B', 'C', 'D'];

  API = 'http://localhost:5000/api/quiz';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    const token = localStorage.getItem('token');

    console.log('QUIZ ID:', id);
    console.log('TOKEN:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>(`${this.API}/${id}`, { headers })
      .subscribe({

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

          console.error('ERROR:', err);

          this.errorMessage =
            err?.error?.message || 'Failed to load quiz';

          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }
}