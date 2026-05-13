import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],

  template: `

<div class="container">

  <h2 class="title">📊 Reports</h2>

  <table>

    <thead>

      <tr>
        <th>Enrollment No.</th>
        <th>Name</th>
        <th>Quiz Title</th>
        <th>Score</th>
      </tr>

    </thead>

    <tbody>

      <tr *ngFor="let report of reports">

        <td>
          {{report.enrollmentNumber}}
        </td>

        <td>
          {{report.fullName}}
        </td>

        <td>
          {{report.quizTitle}}
        </td>

        <td>
          {{report.score}}
        </td>

      </tr>

    </tbody>

  </table>

</div>

`,

  styles: [`

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial, sans-serif;
}

.container{
  padding:30px;
  background:#f4f7fc;
  min-height:100vh;
}

.title{
  font-size:32px;
  font-weight:bold;
  color:#1e293b;
  margin-bottom:25px;
}

table{
  width:100%;
  border-collapse:collapse;
  background:white;
  border-radius:15px;
  overflow:hidden;
  box-shadow:0 5px 20px rgba(0,0,0,0.08);
}

th{
  background:#6366f1;
  color:white;
  padding:16px;
  text-align:left;
  font-size:15px;
}

td{
  padding:14px;
  border-bottom:1px solid #eee;
}

tr:hover{
  background:#f8fafc;
}

@media(max-width:768px){

  table{
    font-size:14px;
  }

}

`]

})

export class ReportsComponent {

  reports = [

    {
      enrollmentNumber: '1010CS231003',
      fullName: 'Aashma Gaykwad',
      quizTitle: 'Java Quiz',
      score: 85
    },

    {
      enrollmentNumber: '1010CS231004',
      fullName: 'Deepa Mujalde',
      quizTitle: 'DBMS Quiz',
      score: 92
    },

    {
      enrollmentNumber: '1010CS231005',
      fullName: 'Rahul Sharma',
      quizTitle: 'Angular Quiz',
      score: 78
    }

  ];

}