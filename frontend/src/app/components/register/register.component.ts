import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">

        <h2>Create Account</h2>

        <p style="margin-bottom: 20px; color: #666;">Register to start your quiz journey</p>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <!-- Full Name -->
          <div class="form-group">
            <input 
              type="text" 
              placeholder="Full Name" 
              formControlName="fullName"
              [class.error-input]="registerForm.get('fullName')?.invalid && registerForm.get('fullName')?.touched">
            <div class="error" *ngIf="registerForm.get('fullName')?.touched && registerForm.get('fullName')?.invalid">
              <span *ngIf="registerForm.get('fullName')?.errors?.['required']">Full name is required</span>
              <span *ngIf="registerForm.get('fullName')?.errors?.['minlength']">Minimum 3 characters required</span>
            </div>
          </div>

          <!-- Username -->
          <div class="form-group">
            <input 
              type="text" 
              placeholder="Username" 
              formControlName="username"
              [class.error-input]="registerForm.get('username')?.invalid && registerForm.get('username')?.touched">
            <div class="error" *ngIf="registerForm.get('username')?.touched && registerForm.get('username')?.invalid">
              Username is required
            </div>
          </div>

          <!-- Enrollment Number -->
          <div class="form-group">
            <input 
             type="text" 
              placeholder="Enrollment Number" 
              formControlName="enrollmentNumber"
             [class.error-input]="registerForm.get('enrollmentNumber')?.invalid && registerForm.get('enrollmentNumber')?.touched">

            <div class="error"
             *ngIf="registerForm.get('enrollmentNumber')?.touched && registerForm.get('enrollmentNumber')?.invalid">

             Enrollment Number is required

            </div>
          </div>

          <!-- Email -->
          <div class="form-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              formControlName="email"
              [class.error-input]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
            <div class="error" *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.invalid">
              <span *ngIf="registerForm.get('email')?.errors?.['required']">Email is required</span>
              <span *ngIf="registerForm.get('email')?.errors?.['email']">Enter a valid email address</span>
            </div>
          </div>

          <!-- Password -->
          <div class="form-group">
            <input 
              type="password" 
              placeholder="Password" 
              formControlName="password"
              [class.error-input]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
            <div class="error" *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.invalid">
              <span *ngIf="registerForm.get('password')?.errors?.['required']">Password is required</span>
              <span *ngIf="registerForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
            </div>
          </div>

          <!-- Phone -->
          <div class="form-group">
            <input 
              type="tel" 
              placeholder="Phone Number (10 digits)" 
              formControlName="phone"
              [class.error-input]="registerForm.get('phone')?.invalid && registerForm.get('phone')?.touched">
            <div class="error" *ngIf="registerForm.get('phone')?.touched && registerForm.get('phone')?.invalid">
              <span *ngIf="registerForm.get('phone')?.errors?.['required']">Phone number is required</span>
              <span *ngIf="registerForm.get('phone')?.errors?.['pattern']">Enter a valid 10-digit phone number</span>
            </div>
          </div>

          <!-- Course -->
          <div class="form-group">
            <input 
              type="text" 
              placeholder="Course (e.g., B.Tech, MCA, BCA)" 
              formControlName="course"
              [class.error-input]="registerForm.get('course')?.invalid && registerForm.get('course')?.touched">
            <div class="error" *ngIf="registerForm.get('course')?.touched && registerForm.get('course')?.invalid">
              Course is required
            </div>
          </div>

          <!-- Branch -->
          <div class="form-group">
            <input 
              type="text" 
              placeholder="Branch (e.g., Computer Science, IT)" 
              formControlName="branch"
              [class.error-input]="registerForm.get('branch')?.invalid && registerForm.get('branch')?.touched">
            <div class="error" *ngIf="registerForm.get('branch')?.touched && registerForm.get('branch')?.invalid">
              Branch is required
            </div>
          </div>

          <!-- Role -->
          <div class="form-group">
            <select formControlName="role" [class.error-input]="registerForm.get('role')?.invalid && registerForm.get('role')?.touched">
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
            <div class="error" *ngIf="registerForm.get('role')?.touched && registerForm.get('role')?.invalid">
              Please select a role
            </div>
          </div>

          <button type="submit" [disabled]="registerForm.invalid || isSubmitting">
            {{ isSubmitting ? 'Registering...' : 'Register' }}
          </button>
        </form>

        <div class="login-link">
          Already have an account? <a routerLink="/login">Login here</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
   
    /* =========================
   RESPONSIVE MODERN UI CSS
========================= */

*{
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

.auth-container{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background:
  linear-gradient(135deg,#667eea,#764ba2);
}

.auth-card{
  width: 100%;
  max-width: 480px;
  background: white;
  padding: 35px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0,0,0,0.25);
  animation: fadeIn 0.5s ease;
}

h2{
  text-align: center;
  margin-bottom: 10px;
  color: #222;
  font-size: 32px;
  font-weight: bold;
}

.subtitle{
  text-align: center;
  color: #666;
  margin-bottom: 25px;
  font-size: 14px;
}

.form-group{
  margin-bottom: 18px;
}

input,
select{
  width: 100%;
  padding: 14px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  transition: 0.3s;
  background: white;
}

input:focus,
select:focus{
  border-color: #667eea;
  box-shadow: 0 0 8px rgba(102,126,234,0.3);
}

.error-input{
  border-color: red !important;
}

.error{
  color: red;
  font-size: 12px;
  margin-top: 5px;
  padding-left: 4px;
}

button{
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  border: none;
  border-radius: 10px;
  background: #667eea;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

button:hover:not(:disabled){
  background: #5a67d8;
  transform: translateY(-2px);
}

button:disabled{
  background: #aaa;
  cursor: not-allowed;
}

.login-link{
  text-align: center;
  margin-top: 20px;
  color: #555;
  font-size: 14px;
}

.login-link a{
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.login-link a:hover{
  text-decoration: underline;
}

/* =========================
   TABLET RESPONSIVE
========================= */

@media(max-width:768px){

  .auth-card{
    max-width: 100%;
    padding: 30px 22px;
  }

  h2{
    font-size: 28px;
  }

  .subtitle{
    font-size: 13px;
  }

  input,
  select{
    padding: 13px;
    font-size: 14px;
  }

  button{
    padding: 13px;
    font-size: 15px;
  }

}

/* =========================
   MOBILE RESPONSIVE
========================= */

@media(max-width:480px){

  .auth-container{
    padding: 15px;
  }

  .auth-card{
    padding: 25px 18px;
    border-radius: 16px;
  }

  h2{
    font-size: 24px;
  }

  .subtitle{
    font-size: 12px;
  }

  input,
  select{
    font-size: 13px;
  }

  button{
    font-size: 14px;
  }

  .login-link{
    font-size: 13px;
  }

}

@keyframes fadeIn{

  from{
    opacity: 0;
    transform: translateY(20px);
  }

  to{
    opacity: 1;
    transform: translateY(0);
  }

}


  `]

})
export class RegisterComponent {

  registerForm: FormGroup;

  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({

      fullName: ['', [Validators.required, Validators.minLength(3)]],

      username: ['', Validators.required],
      enrollmentNumber: ['', Validators.required],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      password: ['', [Validators.required, Validators.minLength(6)]],

      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]],
      course: ['', Validators.required],
      branch: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log(this.registerForm.value); // debug

    this.authService.register(this.registerForm.value).subscribe({

      next: (response: any) => {

        console.log('Registration successful:', response);

        this.isSubmitting = false;

        // Store user data in localStorage

        if (response.user) {
          localStorage.setItem('student', JSON.stringify(response.user));
        } else {
          localStorage.setItem('student', JSON.stringify(this.registerForm.value));
        }

        alert('✅ Registration successful! Please login.');

        },
        error: (err: any) => {

          alert(err.error?.message || 'Registration failed ❌');

          this.isSubmitting = false;
        }
      });
  }
}