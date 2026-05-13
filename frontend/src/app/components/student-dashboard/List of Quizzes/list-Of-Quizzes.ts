import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-start-quiz',
  standalone: true,
  imports: [CommonModule],

  template: `

  <div class="quiz-container">

    <h2>🚀 Start Quiz</h2>

    <p class="subtitle">
      Select your subject and begin the test
    </p>

    <div class="quiz-card">

      <h3>DBMS Quiz</h3>

      <p>Total Questions: 20</p>

      <p>Duration: 30 Minutes</p>

      <button class="quiz-btn">
        Start Now
      </button>

    </div>

  </div>

  `,

  styles: [`

  .quiz-container{
    background:white;
    padding:30px;
    border-radius:20px;
    box-shadow:0 5px 20px rgba(0,0,0,0.08);
  }

  .subtitle{
    color:#6b7280;
    margin-bottom:25px;
  }

  .quiz-card{
    background:#f3f4f6;
    padding:25px;
    border-radius:15px;
  }

  .quiz-card h3{
    margin-bottom:15px;
    color:#111827;
  }

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

  .quiz-btn:hover{
    background:#4f46e5;
  }

  `]
})
export class StartQuizComponent {

}