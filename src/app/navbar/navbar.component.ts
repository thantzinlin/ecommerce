import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  cartItemCount: number = 0;
  constructor(
    private authservice: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });
  }

  logout() {
    // this.authservice.logout();
    localStorage.removeItem('token');
    this.cartService.updateCart(0);
    this.router.navigate(['/login']);
  }
  goAbout() {
    this.router.navigate(['/about']);
  }
  manageAccount() {
    this.router.navigate(['/about']);
  }
  viewOrders() {
    this.router.navigate(['/my-order']);
  }
  goMyReviews() {
    this.router.navigate(['/my-review']);
  }
  handleCancellations() {
    this.router.navigate(['/about']);
  }
}
