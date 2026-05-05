import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],

  styles: [`
    .auth-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #667eea, #764ba2);
    }

    .auth-card {
      background: #fff;
      padding: 30px;
      border-radius: 12px;
      width: 350px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.2);
      text-align: center;
    }

    input, select {
      width: 100%;
      padding: 10px;
      margin: 8px 0;
      border-radius: 6px;
      border: 1px solid #ccc;
    }
      .error {
      color: red;
      font-size: 12px;
      text-align: left;
    }

     .radio-group, .checkbox-group {
      display: flex;
      justify-content: space-around;
      margin: 10px 0;
    }

    label {
     font-size: 14px;
     text-align: left;
     display: block;
      margin-top: 10px;
    }

    button {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      border: none;
      border-radius: 6px;
      background: #667eea;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }
  `],

  template: `
  <div class="auth-container">
    <div class="auth-card">

      <h2>Register</h2>

      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">

        <input type="text" placeholder="Full Name"   formControlName="fullName">
        <div class="error" *ngIf="registerForm.get('fullName')?.touched && registerForm.get('fullName')?.invalid">
         Name is required (min 3 characters)
        </div>
        
        <input type="text" placeholder="Email" formControlName="Email">
        <div class="error" *ngIf="registerForm.get('Email')?.touched && registerForm.get('Email')?.invalid">
        Enter valid email
         </div>

        <input type="password" placeholder="Password" formControlName="password">

        <input type="text" placeholder="Phone Number" formControlName="phone">
        <div class="error" *ngIf="registerForm.get('phone')?.touched && registerForm.get('phone')?.invalid">
        Enter valid 10 digit phone number
        </div>

        <input type="text" placeholder="Course (e.g. B.Tech)" formControlName="course">

        <input type="text" placeholder="Branch (e.g. CSE)" formControlName="branch">

        <select formControlName="year">
          <option value="">Select Year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
           <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
         </select>

        <select formControlName="role">
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
        </select>

        <button type="submit" [disabled]="registerForm.invalid">Register</button>

      </form>

      <p>Already have account? <a routerLink="/login">Login</a></p>

    </div>
  </div>
  `
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({

      fullName: ['', [Validators.required, Validators.minLength(3)]],

      Email: ['', [
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
      year: ['', Validators.required],
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
      next: () => {
        alert("Registration successful ✅");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error?.message || 'Registration failed ❌');
      }
    });
  }
}
