import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],

  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Login</h2>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">

          <input type="text" placeholder="Username" formControlName="username">
          <div *ngIf="loginForm.get('username')?.invalid && loginForm.get('username')?.touched">
            Username required
          </div>

          <input type="password" placeholder="Password" formControlName="password">
          <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
            Password required
          </div>

          <button type="submit" [disabled]="loginForm.invalid">Login</button>
        </form>

        <p>Don't have account? <a routerLink="/register">Register</a></p>

        <div *ngIf="errorMessage">{{ errorMessage }}</div>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Auto redirect if already logged in
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        const role = this.authService.getRole();
        this.router.navigate([role === 'admin' ? '/admin' : '/quiz']);
      }
    });
  }

  onLogin() {
  this.authService.login(this.loginForm.value).subscribe({
     next: (res) => {
    console.log("Login Response:", res);

    // ✅ Save token & role
    this.authService.setSession(res.token, res.role);

    // ✅ Update login state
    this.authService.isLoggedIn$.subscribe(); // optional
    this.authService['isLoggedInSubject'].next(true);

    // ✅ Redirect
    if (res.role === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/student']);
    }
  },
  error: (err) => {
    console.error(err);
    alert("Login failed ❌");
  }
  });
}

  onSubmit(): void {
    if (this.loginForm.valid) {

      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.authService.saveToken(res.token);
          this.authService.saveRole(res.role);

          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Login failed';
        }
      });

    }
  }
}