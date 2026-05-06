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
          <div class="error"
            *ngIf="loginForm.get('username')?.invalid && loginForm.get('username')?.touched">
            Username required
          </div>

          <input type="password" placeholder="Password" formControlName="password">
          <div class="error"
            *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
            Password required
          </div>

          <button type="submit" [disabled]="loginForm.invalid">Login</button>

        </form>

        <p>Don't have account? <a routerLink="/register">Register</a></p>

        <div class="error">{{ errorMessage }}</div>
      </div>
    </div>
  `,

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

    h2 {
      margin-bottom: 20px;
      color: #333;
    }

    input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border-radius: 6px;
      border: 1px solid #ccc;
      outline: none;
    }

    input:focus {
      border-color: #667eea;
      box-shadow: 0 0 5px rgba(102,126,234,0.4);
    }

    button {
      width: 100%;
      padding: 10px;
      margin-top: 15px;
      border: none;
      border-radius: 6px;
      background: #667eea;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      background: #5a67d8;
    }

    button:disabled {
      background: #aaa;
      cursor: not-allowed;
    }

    .error {
      color: red;
      font-size: 12px;
      text-align: left;
      margin-top: 5px;
    }

    a {
      color: #667eea;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Auto redirect if already logged in
    // this.authService.isLoggedIn$.subscribe(isLoggedIn => {
    //   if (isLoggedIn) {
    //     const role = this.authService.getRole();
    //     this.router.navigate([role === 'admin' ? '/admin' : '/quiz']);
    //   }
    // });
  }

  onSubmit(): void {

    console.log("Button clicked");

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log("Success", res);
          this.authService.saveToken(res.token);
          this.authService.saveRole(res.role);

          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log("Error", err);
          this.errorMessage = err.error?.message || 'Login failed';
        }
      });

    }
  }
}