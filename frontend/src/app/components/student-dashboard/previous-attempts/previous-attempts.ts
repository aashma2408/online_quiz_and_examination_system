import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-previous-attempts',
  standalone: true,
  imports: [CommonModule],

  template: `

  <h2>📊 Previous Results</h2>

  <div class="result-box">
    <p>DBMS</p>
    <strong>80%</strong>
  </div>

  <div class="result-box">
    <p>Operating System</p>
    <strong>70%</strong>
  </div>

  `,

  styles: [`

  .result-box{
    background:white;
    padding:20px;
    border-radius:10px;
    margin-top:15px;
    display:flex;
    justify-content:space-between;
  }

  `]
})
export class PreviousAttemptsComponent {

}