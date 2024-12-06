import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ApiService } from '../api.service';
import { Product } from '../model/product.model';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any[] = [];

  couponCode: string = '';
  shippingFee = 1500.0;
  couponApplied: boolean = false;
  couponDiscount: number = 50;
  cart: any;
  constructor(
    private router: Router,
    private cartservice: CartService,
    private http: ApiService
  ) {}
  ngOnInit(): void {
    this.getCartItem();
  }

  async getCartItem() {
    const res: any = await this.http.get(`cart`).toPromise();

    if (res.returncode === '200') {
      this.products = res.data.products;
    }
  }

  async increaseQuantity(product: any) {
    product.quantity++;
    const cart = { productId: product._id, quantity: 1, action: 'increase' };
    const res: any = await this.http.post(`cart`, cart).toPromise();
    if (res.returncode === '200') {
      this.cartservice.updateCart(res.data);
    }
  }

  async decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
    const cart = { productId: product._id, quantity: 1, action: 'decrease' };
    const res: any = await this.http.post(`cart`, cart).toPromise();
    if (res.returncode === '200') {
      this.cartservice.updateCart(res.data);
    }
  }

  async removeItem(product: any) {
    const cart = { productId: product._id, quantity: 0, action: 'remove' };
    const res: any = await this.http.post(`cart`, cart).toPromise();
    if (res.returncode === '200') {
      this.cartservice.updateCart(res.data);
      this.getCartItem();
    }
  }

  getTotalItems(): number {
    return this.products.reduce(
      (total, product) => total + product.quantity,
      0
    );
  }

  getTotalPrice(): number {
    return this.products.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  }

  getGrandTotalPrice(): number {
    return this.getTotalPrice() + this.shippingFee;
  }

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
}
