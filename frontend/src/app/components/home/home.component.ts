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
        <!-- as an admin login -->
        <button *ngIf="role === 'admin'" routerLink="/admin">Admin Dashboard</button>
        <!-- as a student login -->
        <button *ngIf="role === 'student'" routerLink="/student">Student Dashboard</button> 
       
        <button (click)="logout()" class="logout-btn">Logout</button>
      </ng-container>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section class="hero">

    <!-- LEFT -->
    <div class="hero-text">

       <div class="badge">
        ✨ 100% Free Forever
      </div>

      <h1>
        A completely free <br>
        <span>quiz platform</span>
      </h1>

      <p>
        Create interactive quizzes, conduct online exams,
        manage students, track performance and analyze
        reports with ease.
      </p>

      <!-- FEATURES -->
      <div class="hero-features">

        <div class="hero-feature">
          ✅ Live Results
        </div>

        <div class="hero-feature">
          🔒 Secure Exams
        </div>

        <div class="hero-feature">
          📊 Instant Analytics
        </div>

        <div class="hero-feature">
          👨‍🎓 Student Dashboard
        </div>
      </div>

      <!-- CTA -->
      <div class="cta">

        <input
          type="email"
          placeholder="Enter your email address"
        >

        <button
          class="cta-btn"
          routerLink="/register"
        >
          Get Started Free
        </button>
      </div>

      <div class="small-text">
        ✔ No credit card required • Free forever
      </div>
    </div>

     <!-- MAIN IMAGE -->
    <div class="hero-img">
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" />
    </div>
  </section>

  <!-- FEATURES SECTION -->
<section class="features-section">

  <h2 class="section-heading">
    Powerful features for <span>everyone</span>
  </h2>

  <div class="features-grid">

    <!-- FEATURE 1 -->
    <div class="feature-box">
      <div class="feature-icon green">
        <i class="fas fa-pen"></i>
      </div>

      <h3>Easy Quiz Creation</h3>

      <p>
        Create quizzes in minutes with various question
        types and smart tools.
      </p>
    </div>

    <!-- FEATURE 2 -->
    <div class="feature-box">
      <div class="feature-icon purple">
        <i class="fas fa-link"></i>
      </div>

      <h3>Share Anywhere</h3>

      <p>
        Share quizzes via link,
        email or social media
        in just one click.
      </p>
    </div>

    <!-- FEATURE 3 -->
    <div class="feature-box">
      <div class="feature-icon orange">
        <i class="fas fa-chart-column"></i>
      </div>

      <h3>Real-time Analytics</h3>

      <p>
        Get instant results and
        detailed performance
        reports.
      </p>
    </div>

    <!-- FEATURE 4 -->
    <div class="feature-box">
      <div class="feature-icon blue">
        <i class="fas fa-shield-halved"></i>
      </div>

      <h3>Secure & Reliable</h3>

      <p>
        Industry-standard
        security to ensure fair
        and safe exams.
      </p>
    </div>

    <!-- FEATURE 5 -->
    <div class="feature-box">
      <div class="feature-icon pink">
        <i class="fas fa-user-group"></i>
      </div>

      <h3>Student Management</h3>

      <p>
        Manage students, track
        progress and monitor
        performance.
      </p>
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

<!-- FAQ SECTION -->
<section class="faq-section">

  <h2 class="section-heading">
    Frequently asked <span>questions</span>
  </h2>

  <div class="faq-grid">

    <div class="faq-card">
      <h3>Is QuizMaster really free?</h3>
      <p>Yes! QuizMaster is completely free to use.</p>
    </div>

    <div class="faq-card">
      <h3>Can I conduct live quizzes?</h3>
      <p>Absolutely! You can track results live.</p>
    </div>

    <div class="faq-card">
      <h3>Can I import questions?</h3>
      <p>Yes, from Excel and Google Sheets.</p>
    </div>

    <div class="faq-card">
      <h3>Is my data secure?</h3>
      <p>We use industry-level security protection.</p>
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
        <p>Terms & Conditions</p>
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

  /* MAIN THEME COLORS */
:root{
  --primary:#2563eb;
  --secondary:#7c3aed;
  --dark:#0f172a;

  --section-bg:
    linear-gradient(to bottom,#f8fbff,#eef4ff);

  --card-bg:#ffffff;

  --text:#475569;
}


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

/* HERO SECTION */
.hero{
  min-height: 88vh;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:60px 70px 120px;
  background:
    radial-gradient(circle at top left,
    rgba(255,255,255,0.10), transparent 25%),

    radial-gradient(circle at bottom right,
    rgba(255,255,255,0.08), transparent 25%),

     linear-gradient(135deg,#0f172a,#2563eb,#7c3aed);
  position:relative;
  overflow:hidden;
  color:white;
  gap:50px;
}

/* LEFT SIDE */
.hero-text{
  flex:1;
  z-index:2;
}

.badge{
  display:inline-block;
  padding:12px 22px;
  border-radius:30px;
  background:rgba(255,255,255,0.15);
  backdrop-filter:blur(10px);
  font-size:16px;
  font-weight:600;
  margin-bottom:30px;
}

.hero-text h1{
  font-size:76px;
  line-height:1.05;
  font-weight:800;
  margin-bottom:25px;
}

.hero-text h1 span{
  color:#ffd84d;
}

.hero-text p{
  font-size:24px;
  line-height:1.7;
  color:#e2e8f0;
  max-width:700px;
  margin-bottom:35px;
}

/* FEATURE BOXES */
.hero-features{
  display:flex;
  gap:15px;
  flex-wrap:wrap;
  margin-bottom:35px;
}

.hero-feature{
  background:rgba(255,255,255,0.12);
  padding:16px 22px;
  border-radius:16px;
  backdrop-filter:blur(10px);
  font-weight:600;
  transition:0.3s;
}

.hero-feature:hover{
  transform:translateY(-4px);
  background:rgba(255,255,255,0.18);
}

/* CTA */
.cta{
  display:flex;
  align-items:center;
  gap:15px;
  margin-bottom:20px;
}

.cta input{
  width:420px;
  padding:18px;
  border:none;
  border-radius:14px;
  font-size:16px;
  outline:none;
}

.cta-btn{
  border:none;
  padding:18px 35px;
  border-radius:14px;
  background:linear-gradient(90deg,#4f8cff,#b14dff);
  color:white;
  font-size:18px;
  font-weight:700;
  cursor:pointer;
  transition:0.3s;
}

.cta-btn:hover{
  transform:translateY(-2px) scale(1.02);
}

.small-text{
  color:#dbeafe;
  font-size:18px;
}

/* RIGHT IMAGE */
.hero-img{
  flex:1;
  position:relative;
  display:flex;
  justify-content:center;
  align-items:center;
}

.hero-img img{
  width:550px;
  max-width:100%;
  z-index:2;
  animation:float 4s ease-in-out infinite;
}



/* INTEGRATIONS */
.integrations{
  padding:90px 20px;
  text-align:center;
  background:var(--section-bg);
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


/* RESPONSIVE */
@media(max-width:1100px){

  .hero{
    flex-direction:column;
    text-align:center;
    padding:50px 25px 120px;
  }

  .hero-text h1{
    font-size:56px;
  }

  .hero-text p{
    font-size:20px;
    margin:auto auto 30px;
  }

  .hero-features{
    justify-content:center;
  }

  .cta{
    flex-direction:column;
  }

  .cta input{
    width:100%;
  }

  .stats{
    grid-template-columns:repeat(2,1fr);
  }

  .score-card,
  .mcq-card{
    display:none;
  }

}

@media(max-width:700px){

  .hero-text h1{
    font-size:42px;
  }

  .hero-img img{
    width:320px;
  }

  .stats{
    grid-template-columns:1fr;
  }

}

/* FEATURES */
.features-section {
  padding: 80px 50px;
  background:var(--section-bg);
  text-align: center;
}

.section-heading {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 50px;
}

.section-heading span{
  background:linear-gradient(90deg,#2563eb,#7c3aed);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 25px;
}

.feature-box {
  background:var(--card-bg);
  padding: 40px 25px;
  border-radius: 22px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: 0.35s;
  border:1px solid #e2e8f0;
}

.feature-box:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(37,99,235,0.15);
}

.feature-box h3{
  font-size:22px;
  margin-bottom:15px;
  color:#0f172a;
}

.feature-box p{
  color:#64748b;
  line-height:1.7;
  font-size:15px;
}

/* FEATURE ICONS */
.feature-icon{
  width:70px;
  height:70px;
  border-radius:50%;
  margin:auto auto 20px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:28px;
  color:white;
  box-shadow:0 8px 20px rgba(0,0,0,0.12);
}

/* COLORS */
.green{
  background:linear-gradient(135deg,#22c55e,#16a34a);
}

.purple{
  background:linear-gradient(135deg,#8b5cf6,#7c3aed);
}

.orange{
  background:linear-gradient(135deg,#f59e0b,#ea580c);
}

.blue{
  background:linear-gradient(135deg,#3b82f6,#2563eb);
}

.pink{
  background:linear-gradient(135deg,#ec4899,#db2777);
}

/* FAQ */
.faq-section {
  padding:90px 50px;
  background:var(--section-bg);
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
}

.faq-card{
  background:var(--card-bg);
  padding:30px;
  border-radius:20px;
  border:1px solid #dbeafe;
  box-shadow:0 10px 25px rgba(0,0,0,0.06);
  transition:0.3s;
}

.faq-card:hover{
  transform:translateY(-5px);
  box-shadow:0 15px 30px rgba(37,99,235,0.12);
}

.faq-card h3 {
  margin-bottom: 15px;
  color: #0f172a;
}

.faq-card p {
  color: #475569;
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






