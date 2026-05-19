import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],

  template: `

<div class="container">

  <h2 class="title">
    📊 Student Reports
  </h2>

  <!-- LOADING -->

  <div *ngIf="loading" class="loading">
    Loading Reports...
  </div>

  <!-- NO DATA -->

  <div *ngIf="!loading && reports.length === 0" class="no-data">
    No Reports Found
  </div>

  <!-- TABLE -->

  <table *ngIf="!loading && reports.length > 0">

    <thead>
      <tr>
        <th>Enrollment No.</th>
        <th>Name</th>
        <th>Quiz Title</th>
        <th>Score</th>
        <th>Correct</th>
        <th>Wrong</th>
        <th>Date</th>
      </tr>
    </thead>

    <tbody>

      <tr *ngFor="let report of reports">

        <td>
          {{ report.enrollmentNumber || 'N/A' }}
        </td>

        <td>
          {{ report.fullName || 'Unknown' }}
        </td>

        <td>
          {{ report.quizTitle }}
        </td>

        <td>
          {{ report.score }}
          /
          {{ report.totalMarks }}
        </td>

        <td>
          {{ report.correct }}
        </td>

        <td>
          {{ report.wrong }}
        </td>

        <td>
          {{ report.createdAt | date:'medium' }}
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
  font-family:Arial,sans-serif;
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

.loading{
  font-size:18px;
  font-weight:600;
  color:#334155;
}

.no-data{
  padding:20px;
  background:white;
  border-radius:12px;
  font-size:18px;
  font-weight:600;
  color:#64748b;
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
}

td{
  padding:14px;
  border-bottom:1px solid #eee;
}

tr:hover{
  background:#f8fafc;
}

@media(max-width:768px){

  .container{
    padding:15px;
  }

  table{
    font-size:14px;
    display:block;
    overflow-x:auto;
  }

}

`]
})

export class Reports implements OnInit {

  reports: any[] = [];

  loading = true;

  API = 'http://localhost:5000/api/admin/reports';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.loadReports();
  }

  loadReports(): void {

    this.loading = true;

    const token = localStorage.getItem('token');

    if (!token) {

      console.error('No token found');

      this.loading = false;

      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any[]>(
      this.API,
      { headers }
    ).subscribe({

      next: (data) => {

        console.log('REPORTS:', data);

        this.reports = data;

        this.loading = false;
      },

      error: (err) => {

        console.error('REPORT ERROR:', err);

        this.loading = false;
      }
    });
  }
}