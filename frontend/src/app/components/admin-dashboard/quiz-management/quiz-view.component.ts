import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>{{quiz?.title}}</h2>

    <div *ngFor="let q of quiz?.questions">
      <p>{{q.question}}</p>
      <ul>
        <li *ngFor="let opt of q.options">{{opt}}</li>
      </ul>
    </div>
  `
})
export class QuizViewComponent implements OnInit {

  quiz: any;
  API = 'http://localhost:5000/api/quiz';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.http.get(`${this.API}/${id}`)
      .subscribe(res => this.quiz = res);
  }
}