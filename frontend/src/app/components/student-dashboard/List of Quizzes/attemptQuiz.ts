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

<div class="page" *ngIf="!quizSubmitted">

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

        <div class="badge">
          ⏳ {{ formatTime(timeLeft) }}
        </div>

        <div class="badge negative">
          🚫 Negative: {{ quiz?.negativeMark }}
        </div>

      </div>

    </div>

    <!-- TIMER -->

    <div class="timer">

      ⏳ Time Left:
      {{ formatTime(timeLeft) }}

    </div>

    <!-- QUESTION CARD -->

    <div class="question-card">

      <div class="question-header">

        <div class="q-number">
          Q{{ currentQuestionIndex + 1 }}
        </div>

        <h2>
          {{ quiz.questions[currentQuestionIndex]?.questionText }}
        </h2>

      </div>

      <!-- OPTIONS -->

      <div class="options">

        <label
          class="option"
          *ngFor="
            let opt of quiz.questions[currentQuestionIndex]?.options;
            let j = index
          ">

          <input
            type="radio"
            [name]="'question' + currentQuestionIndex"
            [value]="j"
            [(ngModel)]="selectedAnswers[currentQuestionIndex]"
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

    <!-- NAVIGATION -->

    <div class="navigation-buttons">

      <button
        class="nav-btn"
        (click)="previousQuestion()"
        [disabled]="currentQuestionIndex === 0">

        ⬅ Previous

      </button>

      <button
        class="nav-btn"
        (click)="nextQuestion()"
        [disabled]="
          currentQuestionIndex ===
          quiz.questions.length - 1
        ">

        Next ➡

      </button>

    </div>

    <!-- SUBMIT -->

    <div class="submit-section">

      <button
        class="submit-btn"
        (click)="submitQuiz()">

        Submit Quiz

      </button>

    </div>

  </ng-container>

</div>

<!-- RESULT PAGE -->

<div *ngIf="quizSubmitted" class="result-wrapper">

  <div class="result-card">

    <!-- ICON -->

    <div class="result-icon">
      🎉
    </div>

    <!-- TITLE -->

    <h1>Quiz Completed</h1>

    <p class="subtitle">
      Great Job! Here is your performance summary.
    </p>

    <!-- SCORE -->

    <div class="score-circle">

      <div class="score-value">
        {{ result?.score || 0 }}
      </div>

      <div class="score-total">
      /
      {{ result?.totalMarks || 0 }}

</div>
      
      <span>Score</span>

    </div>

    <!-- STATS -->

    <div class="result-stats">

      <div class="stat-box correct">

        <h3>✅ Correct</h3>

        <p>{{ result?.correct || 0 }}</p>

      </div>

      <div class="stat-box wrong">

        <h3>❌ Wrong</h3>

        <p>{{ result?.wrong || 0 }}</p>

      </div>

      <div class="stat-box total">

        <h3>📚 Total</h3>

        <p>{{ result?.total || 0 }}</p>

      </div>

    </div>

    <!-- PERFORMANCE -->

    <div class="performance-message">

  <p *ngIf="
    result?.score ===
    (result?.totalMarks || 0)
  ">
    🏆 Outstanding Performance!
  </p>

  <p *ngIf="
    result?.score >=
    ((result?.totalMarks || 0) / 2)
    &&
    result?.score <
    (result?.totalMarks || 0)
  ">
    👍 Good Work! Keep Improving.
  </p>

  <p *ngIf="
    result?.score <
    ((result?.totalMarks || 0) / 2)
  ">
    📖 Practice More & Try Again.
  </p>

</div>

    <!-- BUTTONS -->

      <div class="result-buttons">

        <!-- DASHBOARD BUTTON -->

        <button class="home-btn" (click)="goToDashboard()">

          🎓 Dashboard

        </button>

        <!-- RE-ATTEMPT BUTTON -->

        <button class="retry-btn" (click)="goToQuizList()">

          🔄 Re-attempt

        </button>

      </div>

</div>

`,

  styles: [`

    body{
  background:#f1f5f9;
}

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

/* TIMER */

.timer{
  margin-bottom:20px;
  background:#111827;
  color:white;
  padding:14px 20px;
  border-radius:14px;
  font-size:18px;
  font-weight:700;
  display:inline-block;
  box-shadow:0 4px 10px rgba(0,0,0,0.1);
}

/* NAVIGATION BUTTONS */

.navigation-buttons{
  margin-top:25px;
  display:flex;
  justify-content:space-between;
  gap:16px;
  flex-wrap:wrap;
}

.nav-btn{
  border:none;
  background:#6366f1;
  color:white;
  padding:14px 24px;
  border-radius:12px;
  font-size:16px;
  font-weight:700;
  cursor:pointer;
  transition:0.25s;
}

.nav-btn:hover{
  background:#4f46e5;
  transform:translateY(-2px);
}

/* DISABLED BUTTON */

.nav-btn:disabled{
  background:#cbd5e1;
  cursor:not-allowed;
  transform:none;
}

/* SELECTED OPTION */

.option input:checked + .option-letter{
  background:#10b981;
}

.option:has(input:checked){
  background:#dcfce7;
  border:1px solid #10b981;
}

/* RESULT PAGE */

.result-wrapper{
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background:linear-gradient(
    135deg,
    #eef2ff,
    #f8fafc
  );
  padding:30px;
}

.result-card{
  width:100%;
  max-width:700px;
  background:white;
  border-radius:30px;
  padding:50px 40px;
  text-align:center;
  box-shadow:0 15px 40px rgba(0,0,0,0.08);
  border:1px solid #e2e8f0;
  animation:fadeIn 0.5s ease;
}

/* ICON */

.result-icon{
  width:100px;
  height:100px;
  margin:auto;
  border-radius:50%;
  background:#ecfdf5;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:50px;
  margin-bottom:20px;
  box-shadow:0 6px 18px rgba(16,185,129,0.2);
}

/* TITLE */

.result-card h1{
  font-size:42px;
  color:#111827;
  margin-bottom:10px;
}

.subtitle{
  font-size:18px;
  color:#6b7280;
  margin-bottom:35px;
}

/* SCORE CIRCLE */

.score-circle{
  width:180px;
  height:180px;
  border-radius:50%;
  margin:0 auto 40px;
  background:linear-gradient(
    135deg,
    #10b981,
    #059669
  );
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  color:white;
  box-shadow:0 10px 25px rgba(16,185,129,0.3);
}

.score-value{
  font-size:56px;
  font-weight:800;
  line-height:1;
}

.score-circle span{
  font-size:20px;
  margin-top:8px;
}

/* STATS */

.result-stats{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
  gap:18px;
  margin-bottom:35px;
}

.stat-box{
  padding:24px;
  border-radius:18px;
  color:white;
  box-shadow:0 6px 16px rgba(0,0,0,0.08);
}

.stat-box h3{
  margin:0 0 12px;
  font-size:20px;
}

.stat-box p{
  font-size:34px;
  font-weight:800;
  margin:0;
}

.correct{
  background:linear-gradient(
    135deg,
    #10b981,
    #059669
  );
}

.wrong{
  background:linear-gradient(
    135deg,
    #ef4444,
    #f25252
  );
}

.total{
  background:linear-gradient(
    135deg,
    #6366f1,
    #4338ca
  );
}

/* MESSAGE */

.performance-message{
  margin-bottom:35px;
}

.performance-message p{
  font-size:24px;
  font-weight:700;
  color:#111827;
}

/* BUTTONS */

.result-buttons{
  display:flex;
  justify-content:center;
  gap:20px;
  flex-wrap:wrap;
}

.home-btn,
.retry-btn{
  border:none;
  padding:16px 28px;
  border-radius:14px;
  font-size:17px;
  font-weight:700;
  cursor:pointer;
  transition:0.25s;
}

.home-btn{
  background:#6366f1;
  color:white;
}

.home-btn:hover{
  background:#4f46e5;
  transform:translateY(-2px);
}

.retry-btn{
  background:#10b981;
  color:white;
}

.retry-btn:hover{
  background:#059669;
  transform:translateY(-2px);
}

.score-total{
  font-size:22px;
  margin-top:6px;
  opacity:0.9;
}

/* ANIMATION */

@keyframes fadeIn{

  from{
    opacity:0;
    transform:translateY(20px);
  }

  to{
    opacity:1;
    transform:translateY(0);
  }
}

/* MOBILE */

@media(max-width:768px){

  .result-card{
    padding:35px 20px;
  }

  .result-card h1{
    font-size:30px;
  }

  .score-circle{
    width:150px;
    height:150px;
  }

  .score-value{
    font-size:42px;
  }

  .performance-message p{
    font-size:20px;
  }

  .home-btn,
  .retry-btn{
    width:100%;
  }
}

/* RESPONSIVE */

@media(max-width:768px){

  .timer{
    width:100%;
    text-align:center;
  }

  .navigation-buttons{
    flex-direction:column;
  }

  .nav-btn{
    width:100%;
  }

  .submit-btn{
    width:100%;
  }

  .result-card{
    width:95%;
    padding:25px;
  }

  .result-card h1{
    font-size:28px;
  }

  .result-card h2{
    font-size:24px;
  }

  .result-card p{
    font-size:18px;
  }
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

  currentQuestionIndex = 0;

  timeLeft = 0;

  timer: any;

  quizSubmitted = false;

  result: any = null;

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

  shuffleArray(array: any[]) {

    for (let i = array.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

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

        this.timeLeft = this.quiz.timeLimit * 60;

        this.startTimer();

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

  startTimer() {

    this.timer = setInterval(() => {

      if (this.timeLeft > 0) {

        this.timeLeft--;

        this.cdr.detectChanges();

      } else {

        clearInterval(this.timer);

        this.submitQuiz();
      }

    }, 1000);
  }

  formatTime(seconds: number): string {

    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  nextQuestion() {

    if (this.currentQuestionIndex < this.quiz.questions.length - 1) {

      this.currentQuestionIndex++;
    }
  }
  previousQuestion() {

    if (this.currentQuestionIndex > 0) {

      this.currentQuestionIndex--;
    }
  }

  submitQuiz() {

    clearInterval(this.timer);

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

        this.quizSubmitted = true;

        this.result = res;

      },

      error: (err) => {

        console.log(err);

        console.log('SUBMIT ERROR:', err);

        alert(
          err?.error?.message ||
          'Failed To Submit Quiz'
        );
      }
    });
  }

  // GO TO DASHBOARD PAGE

  goToDashboard() {

    // navigate to student dashboard
    this.router.navigate(['/student']);

  }


  // GO TO QUIZ LIST PAGE

  goToQuizList() {

    // navigate to list of quizzes page
    this.router.navigate(['/list-Of-Quizzes']);

  }
}