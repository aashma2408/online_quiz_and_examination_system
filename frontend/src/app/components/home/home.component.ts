import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],

  template: `
  <!-- NAVBAR -->
  <header class="navbar">
    <h2 class="logo">QuizMaster</h2>

    <nav>
      <a href="#">Products</a>
      <a href="#">Templates</a>
      <a href="#">Solutions</a>
      <a href="#">Resources</a>
    </nav>

    <div class="auth-buttons">
      <ng-container *ngIf="!isLoggedIn">
        <button routerLink="/login" class="login-btn">Login</button>
        <button routerLink="/register" class="signup-btn">Sign up free</button>
      </ng-container>

      <ng-container *ngIf="isLoggedIn">
        <button *ngIf="role === 'admin'" routerLink="/admin">Admin Dashboard</button>
        <button *ngIf="role === 'student'" routerLink="/dashboard">Dashboard</button>
        <button routerLink="/quiz">Take Quiz</button>
        <button (click)="logout()" class="logout-btn">Logout</button>
      </ng-container>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section class="hero">
    <div class="hero-text">
      <h1>A completely free quiz platform</h1>
      <p>Create, share and analyze quizzes in minutes 🚀</p>

      <div class="cta">
        <input placeholder="Enter your email" />
        <button class="cta-btn">Sign up for Free</button>
      </div>

      <p class="small-text">
        Free forever • No credit card required
      </p>
    </div>

    <div class="hero-img">
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" />
    </div>
  </section>

  <!-- FEATURES -->
  <section class="features">
    <h2>Explore how QuizMaster works</h2>

    <div class="feature-grid">

      <div class="feature-card green">
        <h3>Create quizzes</h3>
        <p>Build unlimited quizzes with multiple question types.</p>
      </div>

      <div class="feature-card orange">
        <h3>Share easily</h3>
        <p>Send quizzes via links, email or social platforms.</p>
      </div>

      <div class="feature-card blue">
        <h3>Analyze results</h3>
        <p>Get insights with reports and performance tracking.</p>
      </div>

    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-grid">

      <div>
        <h4>Products</h4>
        <p>Quiz Builder</p>
        <p>Online Test</p>
        <p>Analytics</p>
      </div>

      <div>
        <h4>Resources</h4>
        <p>Blog</p>
        <p>Help Center</p>
        <p>API Docs</p>
      </div>

      <div>
        <h4>Company</h4>
        <p>About Us</p>
        <p>Contact</p>
        <p>Privacy Policy</p>
      </div>

    </div>

    <p class="copyright">© 2026 QuizMaster</p>
  </footer>
  `,

  styles: [`
  /* NAVBAR */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 40px;
    background: #0f172a;
    color: white;
  }

  nav a {
    margin: 0 15px;
    color: white;
    text-decoration: none;
  }

  .auth-buttons button {
    margin-left: 10px;
    padding: 6px 12px;
    border: none;
    cursor: pointer;
  }

  .signup-btn {
    background: #22c55e;
    color: white;
  }

  .logout-btn {
    background: red;
    color: white;
  }

  /* HERO */
  .hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60px;
    background: linear-gradient(to right, #f8fafc, #e0f2fe);
  }

  .hero-text {
    max-width: 500px;
  }

  .hero-text h1 {
    font-size: 40px;
    margin-bottom: 10px;
  }

  .cta {
    display: flex;
    margin-top: 20px;
  }

  .cta input {
    padding: 10px;
    flex: 1;
  }

  .cta-btn {
    background: #22c55e;
    color: white;
    border: none;
    padding: 10px 20px;
  }

  .hero-img img {
    width: 300px;
  }

  /* FEATURES */
  .features {
    text-align: center;
    padding: 60px;
  }

  .feature-grid {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
  }

  .feature-card {
    width: 250px;
    padding: 20px;
    border-radius: 12px;
    color: white;
  }

  .green { background: #10b981; }
  .orange { background: #f59e0b; }
  .blue { background: #3b82f6; }

  /* FOOTER */
  .footer {
    background: #020617;
    color: white;
    padding: 40px;
  }

  .footer-grid {
    display: flex;
    justify-content: space-around;
  }

  .copyright {
    text-align: center;
    margin-top: 20px;
  }
  `]
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;
  role: string | null = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.role = this.auth.getRole();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}