import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = 'http://localhost:5000/api/auth'; // Make sure this matches your backend port

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(`${this.API}/register`, data);
  }

  login(data: any): Observable<any> {

    return new Observable(observer => {

      this.http.post<any>(`${this.API}/login`, data)
        .subscribe({

          next: (res) => {

            console.log("LOGIN RESPONSE", res);

            // save token
            localStorage.setItem('token', res.token);

            // save role
            localStorage.setItem('role', res.role);

            // save user
            localStorage.setItem(
              'user',
              JSON.stringify(res.user)
            );

            this.isLoggedInSubject.next(true);

            observer.next(res);
          },

          error: (err) => {
            observer.error(err);
          }

        });

    });

  }
  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this.API}/profile`, { headers });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveRole(role: string): void {
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedInSubject.next(false);
  }
}