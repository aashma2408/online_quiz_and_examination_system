import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],

  template: `
    <h2>Register</h2>

    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">

      <input type="text" placeholder="Username" formControlName="username">
      <input type="password" placeholder="Password" formControlName="password">

      <select formControlName="role">
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="student">Student</option>
      </select>

      <button type="submit">Register</button>
    </form>

    <p>Already have account? <a routerLink="/login">Login</a></p>
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
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {

      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          alert("Registration successful ✅");
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert(err.error?.message || 'Registration failed ❌');
        }
      });

    } else {
      alert("Fill all fields");
    }
  }
}