import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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
    .auth-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .auth-card {
      background: white;
      padding: 40px;
      border-radius: 20px;
      width: 100%;
      max-width: 450px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }

    h2 {
      text-align: center;
      margin-bottom: 10px;
      color: #333;
      font-size: 28px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    input, select {
      width: 100%;
      padding: 12px 15px;
      border: 2px solid #e1e5e9;
      border-radius: 10px;
      font-size: 14px;
      transition: all 0.3s;
      box-sizing: border-box;
    }

    input:focus, select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
    }

    .error-input {
      border-color: #e53e3e !important;
    }

    .error {
      color: #e53e3e;
      font-size: 12px;
      margin-top: 5px;
      margin-left: 5px;
    }

    button {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .login-link {
      text-align: center;
      margin-top: 25px;
      color: #666;
    }

    .login-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }

    .login-link a:hover {
      text-decoration: underline;
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      course: ['', Validators.required],
      branch: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    this.isSubmitting = true;
    console.log('Registering user:', this.registerForm.value);

    this.authService.register(this.registerForm.value).subscribe({
      next: (response: any) => {
        console.log('Registration successful:', response);

        // Store user data in localStorage
        if (response.user) {
          localStorage.setItem('student', JSON.stringify(response.user));
        } else {
          localStorage.setItem('student', JSON.stringify(this.registerForm.value));
        }

        alert('✅ Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        const errorMessage = err.error?.message || 'Registration failed. Please try again.';
        alert('❌ ' + errorMessage);
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}