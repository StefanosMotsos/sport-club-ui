import {effect, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment.development';
import {AuthRequest, AuthResponse, LoggedInUser} from '../interfaces/user-login';
import {jwtDecode} from 'jwt-decode';

const API_AUTH_URL = `${environment.apiURL}/api/v1/auth`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)
  router = inject(Router);

  user = signal<LoggedInUser | null>(null);

  constructor() {
    const token = localStorage.getItem('access-token');
    if (token) {
      try {
        const decoded = jwtDecode(token) as LoggedInUser;
        this.user.set(decoded);
      } catch {
        localStorage.removeItem('access-token');
      }
    }

    effect(() => {
      const u = this.user();
      if (u) {
        console.log('User logged in:', u.sub, '| Role:', u.role);
      } else {
        console.log('No user logged in');
      }
    });
  }

  loginUser(credentials: AuthRequest) {
    return this.http.post<AuthResponse>(
      `${API_AUTH_URL}/authenticate`,
      credentials)
  }

  setUserFromToken(token: string) {
    localStorage.setItem('access-token', token);
    const decoded = jwtDecode(token) as LoggedInUser;
    this.user.set(decoded);
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('access-token');
    this.router.navigate(['/']);
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('access-token');
    if (!token) return true;
    try {
      const decoded = jwtDecode(token) as LoggedInUser;
      return decoded.exp < Math.floor(Date.now() / 1000);
    } catch {
      return true;
    }
  }

  isLoggedIn(): boolean {
    return !!this.user() && !this.isTokenExpired();
  }
}
