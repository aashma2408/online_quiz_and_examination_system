import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',

  standalone: true,
  imports: [CommonModule],

  template: `

<!-- CONTENT -->
<main class="content">
    <!-- PROFILE -->
      <div class="profile-container">

  <div class="profile-card">

    <!-- LEFT -->
    <div class="left-section">

      <div class="image-box">

        <div class="image-preview" *ngIf="profileImage">

          <img
           [src]="profileImage"
           class="profile-img"
          />

        </div>

        <div
          class="empty-image"
          *ngIf="!profileImage"
        >
           No Photo
        </div>

        <input
          type="file"
          (change)="onImageChange($event)"
          hidden
          #fileInput
        >

        <button
          class="upload-btn"
          (click)="fileInput.click()"
        >
          Change Photo
        </button>

      </div>

      <h2>{{admin.fullName}}</h2>

      <p class="role">{{admin.role}}</p>

    </div>

    <!-- RIGHT -->
    <div class="right-section">

      <h2>👤 Profile Information</h2>

      <div class="info-grid">

        <div class="info-box">
          <span>Username</span>
          <p>{{admin.username}}</p>
        </div>

        <div class="info-box">
          <span>Email</span>
          <p>{{admin.email}}</p>
        </div>

        <div class="info-box">
          <span>Phone</span>
          <p>{{admin.phone}}</p>
        </div>

        <div class="info-box">
          <span>Course</span>
          <p>{{admin.course}}</p>
        </div>

        <div class="info-box">
          <span>Branch</span>
          <p>{{admin.branch}}</p>
        </div>

        <div class="info-box">
          <span>Role</span>
          <p>{{admin.role}}</p>
        </div>

      </div>

    </div>

  </div>

</div>
  `,

  styles: [`
    *{
  font-family: Arial, sans-serif;
}

.profile-container{
  padding:30px;
  background:#f4f7fc;
  min-height:100vh;
}

.profile-card{
  display:flex;
  gap:30px;
  background:white;
  border-radius:20px;
  padding:30px;
  box-shadow:0 10px 25px rgba(0,0,0,0.1);
}

.left-section{
  width:300px;
  text-align:center;
  border-right:1px solid #ddd;
  padding-right:20px;
}

.image-box{
  position:relative;
}

.profile-img{
  width:180px;
  height:180px;
  border-radius:50%;
  object-fit:cover;
  border:5px solid #6366f1;
}

.empty-image{
  width:180px;
  height:180px;
  border-radius:50%;
  border:4px dashed #cbd5e1;
  display:flex;
  justify-content:center;
  align-items:center;
  margin:auto;
  color:#64748b;
  font-weight:bold;
  background:#f8fafc;
}

.image-preview{
  display:flex;
  justify-content:center;
}

.upload-btn{
  margin-top:15px;
  background:#6366f1;
}

.upload-btn{
  margin-top:15px;
  background:#6366f1;
  color:white;
  border:none;
  padding:10px 18px;
  border-radius:8px;
  cursor:pointer;
  transition:0.3s;
}

.upload-btn:hover{
  background:#4f46e5;
}

.role{
  background:#e0e7ff;
  color:#4338ca;
  display:inline-block;
  padding:8px 16px;
  border-radius:20px;
  margin-top:10px;
  font-weight:bold;
}

.right-section{
  flex:1;
}

.right-section h2{
  margin-bottom:25px;
  color:#1e293b;
}

.info-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:20px;
}

.info-box{
  background:#f8fafc;
  padding:20px;
  border-radius:15px;
  transition:0.3s;
}

.info-box:hover{
  transform:translateY(-5px);
  box-shadow:0 5px 15px rgba(0,0,0,0.1);
}

.info-box span{
  color:#64748b;
  font-size:14px;
}

.info-box p{
  margin-top:8px;
  font-size:18px;
  font-weight:bold;
  color:#0f172a;
}


@media(max-width:768px){

  .profile-container{
    padding:15px;
  }

  .profile-card{
    flex-direction:column;
    padding:20px;
    gap:20px;
  }

  .left-section{
    width:100%;
    border-right:none;
    border-bottom:1px solid #ddd;
    padding-right:0;
    padding-bottom:20px;
  }

  .profile-img{
    width:120px;
    height:120px;
  }

  .upload-btn{
    width:100%;
    font-size:14px;
  }

  .right-section h2{
    text-align:center;
    font-size:20px;
  }

  .info-grid{
    grid-template-columns:1fr;
    gap:15px;
  }

  .info-box{
    padding:15px;
  }

  .info-box p{
    font-size:16px;
  }

}

  `]
})
export class Profile implements OnInit {

  section: string = 'profile';

  profileImage: string = '';

  admin: any = {};

  API = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadProfile();
  }


  onImageChange(event: any) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      this.admin.photo = reader.result as string;

      this.profileImage = this.admin.photo;

      const token = localStorage.getItem('token');

      this.http.put(
        `${this.API}/auth/upload-photo/${this.admin._id}`,
        {
          photo: this.admin.photo
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).subscribe({

        next: (res) => {

          console.log("✅ Photo Uploaded");

        },

        error: (err) => {
          console.log(err);
        }

      });

    };

    reader.readAsDataURL(file);
  }


  loadProfile() {

    const token = localStorage.getItem('token');

    this.http.get<any>(`${this.API}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({

      next: (res) => {

        console.log("✅ Profile Data:", res);

        this.admin = res;

        this.admin = res;

        console.log("ADMIN DATA =", this.admin);

        if (this.admin.photo) {
          this.profileImage = this.admin.photo;
        }

      },

      error: (err) => {
        console.log("❌ Profile Error", err);
      }

    });
  }
}