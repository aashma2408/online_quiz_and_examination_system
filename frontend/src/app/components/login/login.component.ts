import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],

  template: `
    <div class="auth-container">

      <div class="auth-card">

        <div class="logo">
          🎓
        </div>

        <h2>Login</h2>

        <form
          [formGroup]="loginForm"
          (ngSubmit)="onSubmit()"
        >

          <!-- Username -->

          <div class="input-box">

            <input
              type="text"
              placeholder="Enter Username"
              formControlName="username"
            >

          </div>

          <div
            class="error"
            *ngIf="
              loginForm.get('username')?.invalid &&
              loginForm.get('username')?.touched
            "
          >
            Username required
          </div>

          <!-- Password -->

          <div class="input-box">

            <input
              type="password"
              placeholder="Enter Password"
              formControlName="password"
            >

          </div>

          <div
            class="error"
            *ngIf="
              loginForm.get('password')?.invalid &&
              loginForm.get('password')?.touched
            "
          >
            Password required
          </div>

          <!-- Button -->

          <button
            type="submit"
            [disabled]="loginForm.invalid"
          >
            Login
          </button>

        </form>

        <p class="register-text">
          Don't have account?
          <a routerLink="/register">
            Register
          </a>
        </p>

        <div
          class="main-error"
          *ngIf="errorMessage"
        >
          {{ errorMessage }}
        </div>

      </div>

    </div>
  `,

  styles: [`

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
      max-width: 400px;
      background: white;
      padding: 35px 30px;
      border-radius: 20px;
      box-shadow: 0 10px 35px rgba(0,0,0,0.25);
      text-align: center;
      animation: fadeIn 0.5s ease;
    }

    .logo{
      font-size: 50px;
      margin-bottom: 10px;
    }

    h2{
      margin: 0 0 25px;
      font-size: 32px;
      color: #222;
      font-weight: bold;
    }

    .input-box{
      width: 100%;
      margin-bottom: 15px;
    }

    input{
      width: 100%;
      padding: 14px;
      border: 1px solid #dcdcdc;
      border-radius: 10px;
      font-size: 15px;
      outline: none;
      transition: 0.3s;
    }

    input:focus{
      border-color: #667eea;
      box-shadow: 0 0 8px rgba(102,126,234,0.3);
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

    button:hover{
      background: #5a67d8;
      transform: translateY(-2px);
    }

    button:disabled{
      background: #aaa;
      cursor: not-allowed;
      transform: none;
    }

    .error{
      color: red;
      font-size: 12px;
      text-align: left;
      margin-top: -8px;
      margin-bottom: 10px;
      padding-left: 4px;
    }

    .main-error{
      color: red;
      margin-top: 15px;
      font-size: 13px;
      text-align: center;
    }

    .register-text{
      margin-top: 20px;
      color: #555;
      font-size: 14px;
    }

    a{
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }

    a:hover{
      text-decoration: underline;
    }

    /* Tablet */

    @media(max-width:768px){

      .auth-card{
        max-width: 100%;
        padding: 30px 22px;
      }

      h2{
        font-size: 28px;
      }

      input{
        padding: 13px;
        font-size: 14px;
      }

      button{
        padding: 13px;
        font-size: 15px;
      }

    }

    /* Mobile */

    @media(max-width:480px){

      .auth-container{
        padding: 15px;
      }

      .auth-card{
        padding: 25px 18px;
        border-radius: 16px;
      }

      .logo{
        font-size: 42px;
      }

      h2{
        font-size: 24px;
      }

      input{
        font-size: 13px;
      }

      button{
        font-size: 14px;
      }

      .register-text{
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

export class LoginComponent {

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

  }

  onSubmit(): void {

    console.log("🔵 Login button clicked");

    if (this.loginForm.valid) {

      console.log(
        "📤 Sending login data:",
        this.loginForm.value
      );

      this.authService
        .login(this.loginForm.value)

        .subscribe({

          next: (res: any) => {

            console.log(
              "✅ Login success response:",
              res
            );

            // Save token
            localStorage.setItem(
              'token',
              res.token
            );

            // Save role
            localStorage.setItem(
              'role',
              res.role
            );

            // Save user
            localStorage.setItem(
              'user',
              JSON.stringify(res.user)
            );

            // Redirect

            if (res.role === 'admin') {

              this.router.navigate(['/admin']);

            } else {

              this.router.navigate([
                '/student-dashboard'
              ]);

            }

          },

          error: (err) => {

            console.log(
              "❌ Login error:",
              err
            );

            this.errorMessage =
              err.error?.message ||
              'Login failed';

          }

        });

    }

  }

}