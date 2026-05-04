import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  isLoggedIn = false;

  constructor(public auth: AuthService, private router: Router) {
    this.auth.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status; // 🔥 auto update
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  getRole() {
    return this.auth.getRole();
  }
}