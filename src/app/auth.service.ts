import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor() {}

  login() {
    // Logic to perform login, set isAuthenticated to true upon successful login
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  is_Authenticated(): boolean {
    return this.isAuthenticated;
  }
}
