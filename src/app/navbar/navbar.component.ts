import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authservice: AuthService, private router: Router) {}
  logout() {
    this.authservice.logout();
    this.router.navigate(['/admin/login']);
  }
}
