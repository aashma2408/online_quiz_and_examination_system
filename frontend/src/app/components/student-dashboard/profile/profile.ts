import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],

  template: `

  <div *ngIf="isLoading" class="loading">
    Loading profile... ⏳
  </div>

  <div *ngIf="!isLoading && student" class="profile-container">

    <!-- LEFT -->
    <div class="left-section">

    <div
      class="empty-image"
      *ngIf="!selectedPhoto && !student.photo"
    >
      No Photo
    </div>

    <img
     *ngIf="selectedPhoto || student.photo"
     [src]="selectedPhoto || student.photo"
     class="profile-img"
    />

    <input
     type="file"
     accept="image/*"
     (change)="onFileSelected($event)"
     hidden
     #fileInput
    />

    <button
      class="photo-btn"
      (click)="fileInput.click()"
    >
      Choose Photo
    </button>

      <h1>{{ student.fullName }}</h1>

      <div class="role-badge">
        {{ student.role }}
      </div>

    </div>

    <!-- RIGHT -->
    <div class="right-section">

      <h2 class="title">
        👤 Profile Information
      </h2>

      <div class="info-grid">

        <div class="info-card">
          <label>Username</label>
          <p>{{ student.username }}</p>
        </div>

        <div class="info-card">
          <label>Enrollment Number</label>
          <p>{{ student.enrollmentNumber }}</p>
        </div>

        <div class="info-card">
          <label>Email</label>
          <p>{{ student.email }}</p>
        </div>

        <div class="info-card">
          <label>Phone</label>
          <p>{{ student.phone }}</p>
        </div>

        <div class="info-card">
          <label>Course</label>
          <p>{{ student.course }}</p>
        </div>

        <div class="info-card">
          <label>Branch</label>
          <p>{{ student.branch }}</p>
        </div>

        <div class="info-card">
          <label>Role</label>
          <p>{{ student.role }}</p>
        </div>

      </div>

    </div>

  </div>

  `,

  styles: [`

    .loading{
    text-align:center;
    padding:50px;
    font-size:22px;
    font-weight:600;
  }

  .profile-container{
    width:92%;
    margin:25px auto;
    background:#ffffff;
    border-radius:22px;
    padding:35px;
    display:flex;
    gap:35px;
    box-shadow:0 4px 20px rgba(0,0,0,0.08);
    align-items:center;
  }

  /* LEFT */

  .left-section{
    width:280px;
    text-align:center;
    border-right:2px solid #ececec;
    padding-right:30px;
  }

  .profile-img{
    width:170px;
    height:170px;
    border-radius:50%;
    object-fit:cover;
    border:5px solid #6366f1;
  }

  .empty-image{
  width:170px;
  height:170px;
  border-radius:50%;
  border:4px dashed #cbd5e1;
  display:flex;
  justify-content:center;
  align-items:center;
  margin:auto;
  background:#f8fafc;
  color:#64748b;
  font-size:18px;
  font-weight:600;
}

  .photo-btn{
    margin-top: 18px;
    padding: 12px 24px;
    border: none;
    border-radius: 12px;
    background: #6366f1;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
  }

 .photo-btn:hover{
   background: #4f46e5;
   transform: translateY(-2px);
  }
  

  .left-section h1{
    margin-top:22px;
    font-size:28px;
    color:#111827;
    font-weight:700;
  }

  .role-badge{
    margin-top:18px;
    display:inline-block;
    padding:10px 22px;
    border-radius:30px;
    background:#e0e7ff;
    color:#4338ca;
    font-size:16px;
    font-weight:600;
  }

  /* RIGHT */

  .right-section{
    flex:1;
  }

  .title{
    font-size:34px;
    margin-bottom:30px;
    color:#1e293b;
  }

  .info-grid{
    display:grid;
    grid-template-columns:repeat(2, 1fr);
    gap:20px;
  }

  .info-card{
    background:#f5f7fb;
    border-radius:16px;
    padding:22px;
  }

  .info-card label{
    display:block;
    color:#6b7280;
    font-size:15px;
    margin-bottom:10px;
  }

  .info-card p{
    margin:0;
    font-size:24px;
    font-weight:700;
    color:#111827;

    /* text overflow fix */
    word-break:break-word;
  }

  /* MOBILE */

  /* MOBILE RESPONSIVE */

@media(max-width:768px){

  .profile-container{
    width:95%;
    margin:15px auto;
    padding:20px;
    flex-direction:column;
    gap:25px;
  }

  /* LEFT SECTION */
  .left-section{
    width:100%;
    border-right:none;
    border-bottom:2px solid #ececec;
    padding-right:0;
    padding-bottom:20px;
    text-align:center;
  }

  .profile-img{
    width:120px;
    height:120px;
  }

  .left-section h1{
    font-size:24px;
  }

  .role-badge{
    font-size:14px;
    padding:8px 18px;
  }

  .photo-btn{
    width:100%;
    max-width:250px;
    font-size:14px;
    padding:10px;
  }

  /* RIGHT SECTION */
  .right-section{
    width:100%;
  }

  .title{
    text-align:center;
    font-size:24px;
    margin-bottom:20px;
  }

  /* INFO GRID */
  .info-grid{
    grid-template-columns:1fr;
    gap:15px;
  }

  .info-card{
    padding:18px;
  }

  .info-card label{
    font-size:14px;
  }

  .info-card p{
    font-size:18px;
  }

}



  `]
})

export class ProfileComponent implements OnInit {

  student: any;
  isLoading = true;

  selectedPhoto: any = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>(
      'http://localhost:5000/api/auth/profile',
      { headers }
    )
      .subscribe({

        next: (res) => {

          console.log(res);

          this.student = res;

          this.isLoading = false;
        },

        error: (err) => {

          console.log(err);

          this.isLoading = false;
        }

      });
  }

  onFileSelected(event: any) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      this.selectedPhoto = reader.result as string;

    };

    reader.readAsDataURL(file);
  }

}