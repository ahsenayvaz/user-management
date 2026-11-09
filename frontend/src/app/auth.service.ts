import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { API_URL } from './api';

export interface User {
  id: number;
  username: string;
  fullName: string;
  role: 'admin' | 'user';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  user = signal<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));

  get token() {
    return localStorage.getItem('token');
  }

  get isAdmin() {
    return this.user()?.role === 'admin';
  }

  login(username: string, password: string) {
    return this.http
      .post<{ accessToken: string; user: User }>(`${API_URL}/auth/login`, { username, password })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.user.set(res.user);
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user.set(null);
    this.router.navigate(['/login']);
  }
}
