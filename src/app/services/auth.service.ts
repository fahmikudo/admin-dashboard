import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  email: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Hardcoded credentials
  private readonly VALID_CREDENTIALS = {
    email: 'admin@dashboard.com',
    username: 'admin',
    password: 'admin123',
  };

  constructor(private router: Router) {
    // Check if user is already logged in on service initialization
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(emailOrUsername: string, password: string): boolean {
    // Check credentials
    const isValidEmail =
      emailOrUsername === this.VALID_CREDENTIALS.email &&
      password === this.VALID_CREDENTIALS.password;
    const isValidUsername =
      emailOrUsername === this.VALID_CREDENTIALS.username &&
      password === this.VALID_CREDENTIALS.password;

    if (isValidEmail || isValidUsername) {
      const user: User = {
        email: this.VALID_CREDENTIALS.email,
        username: this.VALID_CREDENTIALS.username,
      };

      // Save user to localStorage and update current user
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);

      return true;
    }

    return false;
  }

  logout(): void {
    // Remove user from localStorage and update current user
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
