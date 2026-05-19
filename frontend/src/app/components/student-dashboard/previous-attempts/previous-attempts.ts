import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-previous-attempts',
  standalone: true,
  imports: [CommonModule],

  template: `

<div class="page">

  <h2>📊 Previous Quiz Results</h2>

  <!-- LOADING -->

  <div *ngIf="loading" class="loading">
    Loading Results...
  </div>

  <!-- EMPTY -->

  <div *ngIf="!loading && attempts.length === 0" class="empty">

    No Quiz Attempts Found

  </div>

  <!-- ATTEMPTS -->

  <div
    class="result-box"
    *ngFor="let item of attempts">

    <div class="left">

      <h3>
        {{ item.quizTitle }}
      </h3>

      <p>
        📅
        {{ item.createdAt | date:'medium' }}
      </p>

    </div>

    <div class="right">

      <div class="score">
        {{ item.score }}
        /
        {{ item.totalMarks }}
      </div>

      <div
        class="status"
        [ngClass]="{
          pass: item.score >= (item.totalMarks / 2),
          fail: item.score < (item.totalMarks / 2)
        }">

        {{
          item.score >= (item.totalMarks / 2)
          ? 'PASS'
          : 'FAIL'
        }}

      </div>

    </div>

  </div>

</div>

  `,

  styles: [`

.page{
  padding:30px;
  background:#f1f5f9;
  min-height:100vh;
}

/* TITLE */

h2{
  margin-bottom:25px;
  color:#111827;
}

/* LOADING */

.loading,
.empty{
  font-size:18px;
  font-weight:600;
  color:#6b7280;
}

/* RESULT CARD */

.result-box{
  background:white;
  padding:22px;
  border-radius:18px;
  margin-bottom:18px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  box-shadow:0 4px 10px rgba(0,0,0,0.05);
  border:1px solid #e2e8f0;
}

/* LEFT */

.left h3{
  margin:0;
  color:#111827;
  font-size:22px;
}

.left p{
  margin-top:8px;
  color:#6b7280;
}

/* RIGHT */

.right{
  text-align:right;
}

.score{
  font-size:28px;
  font-weight:800;
  color:#10b981;
}

.status{
  margin-top:8px;
  padding:6px 14px;
  border-radius:30px;
  font-size:14px;
  font-weight:700;
  display:inline-block;
}

.pass{
  background:#dcfce7;
  color:#15803d;
}

.fail{
  background:#fee2e2;
  color:#dc2626;
}

/* MOBILE */

@media(max-width:768px){

  .result-box{
    flex-direction:column;
    align-items:flex-start;
    gap:15px;
  }

  .right{
    text-align:left;
    width:100%;
  }

  .score{
    font-size:24px;
  }
}

  `]
})

export class PreviousAttempts implements OnInit {

  attempts: any[] = [];

  loading = true;

  API = 'http://localhost:5000/api/quiz/my-attempts';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any[]>(
      this.API,
      { headers }
    ).subscribe({

      next: (res) => {

        this.attempts = res;

        this.loading = false;

        console.log('ATTEMPTS:', res);
      },

      error: (err) => {

        console.log(err);

        this.loading = false;
      }
    });
  }
}