import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API = 'http://localhost:5000/api/auth';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post(`${this.API}/register`, data);
  }

  login(data: any): Observable<any> {
  return this.http.post<any>(`${this.API}/login`, data);
}

  isLoggedIn() {
  return !!localStorage.getItem('token');
}

  // Token store karne ke liye
  setSession(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveRole(role: string) {
    localStorage.setItem('role', role);
  }

  getRole() {
    return localStorage.getItem('role');
  }

  logout() {
    localStorage.clear();
    this.isLoggedInSubject.next(false);
  }
}