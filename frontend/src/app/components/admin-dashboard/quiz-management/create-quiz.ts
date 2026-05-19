import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],

  template: `
    <div class="quiz-container">
  <h2>✨ Create Quiz</h2>

  <div class="quiz-form">
    <input type="text" placeholder="Enter Quiz Title" [(ngModel)]="title" />

    <div class="row">
      <input type="number" placeholder="Total Questions" />
      <input type="number" placeholder="Time (in minutes)" [(ngModel)]="time" />
    </div>

    <div class="row">
      <input type="number" placeholder="Marks per Question" />
      <input type="number" placeholder="Negative Marks" [(ngModel)]="negativeMark" />
    </div>
  </div>

  <!-- QUESTIONS LIST -->
  <div *ngFor="let q of questions; let i = index" class="question-box">
    <h3>Question {{i + 1}}</h3>

    <input type="text" placeholder="Enter Question" [(ngModel)]="q.question" name="question{{i}}"/>

    <div class="options">
      <input type="text" placeholder="Option A" [(ngModel)]="q.options[0]" name="option{{i}}A" />
      <input type="text" placeholder="Option B" [(ngModel)]="q.options[1]" name="option{{i}}B" />
      <input type="text" placeholder="Option C" [(ngModel)]="q.options[2]" name="option{{i}}C" />
      <input type="text" placeholder="Option D" [(ngModel)]="q.options[3]" name="option{{i}}D" />
    </div>

    <select [(ngModel)]="q.answer" name="answer{{i}}">
      <option value="">Select Correct Answer</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
    </select>
  </div>

  <!-- ADD QUESTION BUTTON -->
  <button class="add-btn" (click)="addQuestion()">➕ Add Question</button>

  <!-- CREATE QUIZ -->
  <button class="create-btn" (click)="createQuiz()">🚀 Create Quiz</button>
</div>
  `,

  styles: [`
    .quiz-container {
      max-width: 800px;
      margin: auto;
      padding: 20px;
    }

    h2 {
      color: #6a5acd;
      margin-bottom: 20px;
    }

    .quiz-form input,
    textarea,
    select {
      width: 100%;
      padding: 10px;
      margin: 8px 0;
      border-radius: 8px;
      border: 1px solid #ccc;
    }

    .row {
      display: flex;
      gap: 10px;
    }

    .question-box {
      margin-top: 20px;
      padding: 15px;
      border-radius: 12px;
      background: #f9f9ff;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .options input {
      margin-top: 5px;
    }

    .add-btn {
      margin-top: 10px;
      background: #6a5acd;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    .create-btn {
      margin-top: 20px;
      width: 100%;
      background: #28a745;
      color: white;
      padding: 12px;
      border: none;
      border-radius: 10px;
      font-size: 16px;
    }
  `]
})
export class CreateQuiz {

  API = 'http://localhost:5000/api/quiz';

  title = '';
  time = 0;
  negativeMark = 0;

  questions: any[] = [
    {
      question: '',
      options: ['', '', '', ''],
      answer: ''
    }
  ];

  constructor(private http: HttpClient) { }

  addQuestion() {
    this.questions.push({
      question: '',
      options: ['', '', '', ''],
      answer: ''
    });
  }

  createQuiz() {
    console.log("CLICKED");

    const token = localStorage.getItem('token');

    console.log("TOKEN:", token);
    console.log("QUESTIONS:", this.questions);

    for (let i = 0; i < this.questions.length; i++) {
      const q = this.questions[i];

      if (!q.question || q.options.includes('') || !q.answer) {
        alert(`Fill all fields in Question ${i + 1}`);
        return;
      }
    }

    const quizData = {
      title: this.title,
      timeLimit: this.time,
      negativeMark: this.negativeMark,
      questions: this.questions
    };

    console.log("SENDING DATA:", quizData);

    this.http.post(this.API, quizData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (res) => {
        console.log("SUCCESS:", res);
        alert('Quiz Created ✅');

        this.title = '';
        this.time = 0;
        this.negativeMark = 0;

        this.questions = [
          {
            question: '',
            options: ['', '', '', ''],
            answer: ''
          }
        ];
      },
      error: (err) => {
        console.log("FULL ERROR:", err);
        alert(err.error?.message || 'Error creating quiz ❌');
      }
    });
  }
}