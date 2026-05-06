import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../../frontend/src/app/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],

  template: `
  <!-- NAVBAR -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <header class="navbar">
    <h2 class="logo">QuizMaster</h2>

    <nav>

  <!-- PRODUCTS -->
  <div class="dropdown">
    <a href="#">Products ▾</a>
    <div class="dropdown-menu">
      <a href="#">Quiz Builder</a>
      <a href="#">Online Test</a>
      <a href="#">Analytics</a>
    </div>
  </div>

  <!-- TEMPLATES -->
  <div class="dropdown">
    <a href="#">Templates ▾</a>
    <div class="dropdown-menu">
      <a href="#">Data Science</a>
      <a href="#">Programming</a>
      <a href="#">Placement</a>
    </div>
  </div>

  <!-- SOLUTIONS -->
  <div class="dropdown">
    <a href="#">Solutions ▾</a>
    <div class="dropdown-menu">
      <a href="#">For Students</a>
      <a href="#">For Teachers</a>
      <a href="#">For Companies</a>
    </div>
  </div>

  <!-- RESOURCES -->
  <div class="dropdown">
    <a href="#">Resources ▾</a>
    <div class="dropdown-menu">
      <a href="#">Blog</a>
      <a href="#">Help Center</a>
      <a href="#">API Docs</a>
    </div>
  </div>

</nav>

    <div class="auth-buttons">
  
      <ng-container *ngIf="!isLoggedIn">
        <button routerLink="/login" class="login-btn">Login</button>
        <button routerLink="/register" class="signup-btn">Register</button>
      </ng-container>

      <ng-container *ngIf="isLoggedIn">
        <button *ngIf="role === 'admin'" routerLink="/admin">Admin Dashboard</button>
        <button *ngIf="role === 'admin'" routerLink="/quiz">Take Quiz</button>

        <button *ngIf="role === 'student'" routerLink="/student">Student Dashboard</button> 
        <button *ngIf="role === 'student'" routerLink="/startQuiz">Start Quiz</button>
       
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
        <button class="cta-btn" routerLink="/register">Get Started</button>
      </div>

      
    </div>

    <div class="hero-img">
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" />
    </div>
  </section>

  <section class="features">
  <h2 class="section-title">Explore how QuizMaster works</h2>

  <div class="template-grid">

  <!-- DATA SCIENCE -->
  <div class="template-card">
    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71">
    <h3>Data Science Quiz</h3>
    <p>Test your knowledge of data analysis, ML & statistics.</p>
    <a href="#">Use template</a>
  </div>

  <!-- C++ -->
  <div class="template-card">
    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475">
    <h3>C++ Programming</h3>
    <p>Practice coding concepts, OOPs & problem solving.</p>
    <a href="#">Use template</a>
  </div>

  <!-- PLACEMENT -->
  <div class="template-card">
    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978">
    <h3>Placement Quiz</h3>
    <p>Prepare for aptitude, reasoning & interview questions.</p>
    <a href="#">Use template</a>
  </div>

</div>

  <div class="feature-grid">

    <!-- CARD 1 -->
    <div class="feature-card green">
      <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" />
      <h3>📝 Create quizzes</h3>
      <p>Create quizzes in minutes with multiple question types and smart tools.</p>
    </div>

    <!-- CARD 2 -->
    <div class="feature-card orange">
      <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" />
      <h3>🚀 Share easily</h3>
      <p>Send quizzes via links, email or social media easily.</p>
    </div>

    <!-- CARD 3 -->
    <div class="feature-card blue">
      <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" />
      <h3>📊 Analyze results</h3>
      <p>Track results with real-time reports and analytics dashboard.</p>
    </div>

  </div>
</section>

<section class="integrations">
  <h2>Create quiz in your favorite tools</h2>

  <div class="tools">

    <div class="tool">
      <img src="https://cdn-icons-png.flaticon.com/512/732/732220.png">
      <p>Excel</p>
    </div>


    <div class="tool">
      <img src="https://cdn-icons-png.flaticon.com/512/732/732220.png">
      <p>PowerPoint</p>
    </div>

    <div class="tool">
      <img src="https://cdn-icons-png.flaticon.com/512/906/906175.png">
      <p>Google Slides</p>
    </div>

    <div class="tool">
      <img src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png">
      <p>Teams</p>
    </div>

    <div class="tool">
      <img src="https://cdn-icons-png.flaticon.com/512/5968/5968756.png">
      <p>Zoom</p>
    </div>

    <div class="tool">
  <img src="https://cdn-icons-png.flaticon.com/512/5968/5968528.png">
  <p>Classroom</p>
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
    <div class="social-icons">
       <a href="#"><i class="fab fa-facebook-f"></i></a>
       <a href="#"><i class="fab fa-github"></i></a>
       <a href="#"><i class="fab fa-instagram"></i></a>
       <a href="#"><i class="fab fa-twitter"></i></a>
       <a href="#"><i class="fab fa-linkedin-in"></i></a>
      </div>


    <p class="copyright">© 2026 QuizMaster</p>
  </footer>
  `,



  styles: [`
* {
  box-sizing: border-box;
  font-family: 'Segoe UI', sans-serif;
}

/* NAVBAR */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 60px;
  background: #0f172a;
  color: white;
  position: sticky;
  top: 0;
}

/* DROPDOWN COMMON */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 40px;
  left: 0;
  background: white;
  min-width: 180px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  display: none;
  flex-direction: column;
  z-index: 1000;
}

.dropdown-menu a {
  padding: 12px 15px;
  color: #0f172a;
  text-decoration: none;
}

.dropdown-menu a:hover {
  background: #f1f5f9;
}

/* hover logic */
.dropdown:hover .dropdown-menu {
  display: flex;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo {
  font-size: 22px;
  font-weight: bold;
}

nav a {
  margin: 0 15px;
  color: #cbd5f5;
  text-decoration: none;
}

nav a:hover {
  color: white;
}

/* BUTTONS */
.auth-buttons button {
  margin-left: 10px;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.login-btn {
  background: transparent;
  color: white;
  border: 1px solid white;
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
  padding: 80px 60px;
  background: linear-gradient(to right, #a2cdf8, #cde7f8);
}

.hero-text h1 {
  font-size: 48px;
}

.cta {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.cta input {
  padding: 10px;
  flex: 1;
}

.cta-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
}

.hero-img img {
  width: 400px;
}

/* TEMPLATES */
.templates {
  padding: 80px 40px;
  text-align: center;
  background: linear-gradient(to right, #a2cdf8, #cde7f8);
}

.template-grid {
  display: flex;
  gap: 30px;
  justify-content: center;
  margin-top: 40px;
  flex-wrap: wrap;
}

.template-card {
  width: 300px;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  transition: 0.3s;
}

.template-card:hover {
  transform: translateY(-8px);
}

.template-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.template-card h3 {
  margin: 10px;
}

.template-card a {
  color: #22c55e;
  text-decoration: none;
  font-weight: bold;
}

/* FEATURES MODERN */
.features {
  text-align: center;
  padding: 80px 40px;
   background: linear-gradient(to right, #a2cdf8, #cde7f8);
}

.section-title {
  font-size: 32px;
  font-weight: bold;
}

.feature-grid {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 50px;
  flex-wrap: wrap;
}

.feature-card {
  width: 300px;
  padding: 30px 20px;
  border-radius: 20px;
  color: white;
  text-align: center;
  transition: 0.4s;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.feature-card img {
  width: 60px;
  margin-bottom: 15px;
}

.feature-card h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.feature-card p {
  font-size: 14px;
  opacity: 0.9;
}

/* HOVER EFFECT 🔥 */
.feature-card:hover {
  transform: translateY(-10px) scale(1.03);
}

/* COLORS */
.green {
  background: linear-gradient(135deg, #10b981, #34d399);
}

.orange {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
}

.blue {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
}

/* INTEGRATIONS */
.integrations {
  padding: 80px 20px;
  text-align: center;
  background: linear-gradient(to right, #a2cdf8, #cde7f8);
}

/* tools container */
.tools {
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* responsive */
  gap: 50px;
  margin-top: 40px;
}

/* each tool */
.tool {
  width: 120px;
  text-align: center;
  padding: 15px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: 0.3s;
}

/* hover effect */
.tool:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

/* icon */
.tool img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

/* text */
.tool p {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
}

/* SOCIAL ICONS */
.social-icons {
  text-align: center;
  margin-top: 20px;
}

.social-icons a {
  margin: 0 10px;
  color: white;
  font-size: 18px;
  transition: 0.3s;
}

.social-icons a:hover {
  color: #3b82f6;
}

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
}
`]

})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;
  role: string = '';

  constructor(private auth: AuthService, private router: Router) {
    this.auth.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;

      // 🔥 role bhi update karo
      this.role = (this.auth.getRole() || '').toLowerCase();
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.role = (this.auth.getRole() || '').toLowerCase();
  }

  logout() {
    this.auth.logout();
    alert("Logged out successfully ✅");
    this.router.navigate(['/']);
  }
}