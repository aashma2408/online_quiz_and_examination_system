import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule, FormsModule],


  template: `

<div class="container">

  <h2 class="title">👨‍🎓 Student Management</h2>

  <!-- SEARCH -->
  <div class="topbar">

    <input
      [(ngModel)]="searchText"
      placeholder="Search student..."
    >

  </div>

  <!-- TABLE -->
  <table>

    <thead>

      <tr>
        <th>Enrollment No.</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Actions</th>
      </tr>

    </thead>

    <tbody>

      <tr *ngFor="let student of paginatedStudents()">

        <td><b>{{student.enrollmentNumber}}</b></td>

        <td>{{student.fullName}}</td>

        <td>{{student.email}}</td>

        <td><b>{{student.phone}}</b></td>

        <td>
          <button
            class="delete-btn action-btn"
            (click)="deleteStudent(student._id)"
          >
            Delete
          </button>

        </td>

      </tr>

    </tbody>

  </table>

  <!-- PAGINATION -->
  <div class="pagination">

    <button (click)="prevPage()">
      Prev
    </button>

    <button
      *ngFor="let p of pages"
      (click)="goToPage(p)"
      [style.fontWeight]="p === currentPage ? 'bold' : 'normal'"
    >
      {{p}}
    </button>

    <button (click)="nextPage()">
      Next
    </button>

  </div>

</div> 

`,

  styles: [`
  
  *{
  font-family: Arial, sans-serif;
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

.topbar{
  display:flex;
  gap:15px;
  margin-bottom:25px;
}

input,select{
  padding:12px 15px;
  border-radius:10px;
  border:1px solid #cbd5e1;
  font-size:15px;
  outline:none;
  transition:0.3s;
}

input:focus,
select:focus{
  border-color:#6366f1;
  box-shadow:0 0 0 4px rgba(141, 141, 147, 0.2);
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
  vertical-align: middle;
}

tr:hover{
  background:#f8fafc;
}

button{
  border:none;
  padding:10px 16px;
  border-radius:8px;
  cursor:pointer;
  transition:0.3s;
  font-weight:600;
}

button:hover{
  transform:translateY(-2px);
}

.action-btn{
  margin-right:8px;
}

.edit-btn{
  background:#0ea5e9;
  color:white;
}

.delete-btn{
  background:#ef4444;
  color:white;
}



.pagination{
  margin-top:25px;
  display:flex;
  gap:10px;
}

.pagination button{
  background:#6366f1;
  color:white;
}

.edit-box{
  background:white;
  padding:25px;
  border-radius:15px;
  margin-bottom:25px;
  box-shadow:0 5px 15px rgba(0,0,0,0.08);
}

.edit-box h3{
  margin-bottom:20px;
  color:#1e293b;
}

.status-active{
  color:#10b981;
  font-weight:bold;
}

.status-inactive{
  color:#ef4444;
  font-weight:bold;
}

@media(max-width:768px){

  .topbar{
    flex-direction:column;
  }

  table{
    font-size:14px;
  }

}
  `]
})
export class StudentManagement implements OnInit {

  students: any[] = [];

  searchText = '';

  currentPage = 1;

  pageSize = 5;

  API = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.http.get(`${this.API}/auth/students`)
      .subscribe((res: any) => {

        console.log(res);

        this.students = res;

      });
  }


  deleteStudent(id: string) {
    this.http.delete(`${this.API}/admin/student/${id}`)
      .subscribe(() => {
        this.loadStudents();
      });
  }



  filteredStudents() {

    return this.students.filter(s =>


      s.fullName?.toLowerCase()
        .includes(this.searchText.toLowerCase())

      ||

      s.email?.toLowerCase()
        .includes(this.searchText.toLowerCase())


    );

  }

  paginatedStudents() {

    const filtered = this.filteredStudents();

    const start =
      (this.currentPage - 1) * this.pageSize;

    return filtered.slice(
      start,
      start + this.pageSize
    );

  }

  nextPage() {

    if (
      this.currentPage * this.pageSize
      <
      this.filteredStudents().length
    ) {
      this.currentPage++;
    }

  }

  prevPage() {

    if (this.currentPage > 1) {
      this.currentPage--;
    }

  }

  get totalPages() {

    return Math.ceil(
      this.filteredStudents().length
      /
      this.pageSize
    );

  }

  get pages() {

    return Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );

  }

  goToPage(page: number) {
    this.currentPage = page;
  }

}