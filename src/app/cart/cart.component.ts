import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ApiService } from '../api.service';
import { Product } from '../model/product.model';
import { Action } from 'rxjs/internal/scheduler/Action';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any[] = [];
  cartId: string = '';
  couponCode: string = '';
  shippingFee: number = 0;
  couponApplied: boolean = false;
  couponDiscount: number = 50;
  subtotal: number = 0;
  grandTotal: number = 0;
  totalItems: number = 0;
  cart: any;
  constructor(
    private router: Router,
    private cartservice: CartService,
    private http: ApiService
  ) {}
  ngOnInit(): void {
    this.cartId = localStorage.getItem('cartId') || '';
    if (this.cartId) {
      this.getCartItem();
    }
  }

  async getCartItem() {
    const res: any = await firstValueFrom(
      this.http.get(`cart?cartId=${this.cartId}`)
    );

    if (res.returncode === '200') {
      this.products = res.data.products;
      await this.getSubTotalPrice();
      this.shippingFee = 2000.0;
      this.getGrandTotalPrice();

      this.getTotalItems();
    }
  }

  async increaseQuantity(product: any) {
    product.quantity++;
    const cart = {
      cartId: this.cartId,
      productId: product._id,
      quantity: 1,
      action: 'increase',
    };
    const res: any = await this.http.post(`cart`, cart).toPromise();

    if (res.returncode === '200') {
      this.cartservice.updateCart(res.data);
    }
  }

  async decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
    const cart = {
      cartId: this.cartId,
      productId: product._id,
      quantity: 1,
      action: 'decrease',
    };
    const res: any = await this.http.post(`cart`, cart).toPromise();
    if (res.returncode === '200') {
      this.cartservice.updateCart(res.data);
    }
  }

  async removeItem(product: any) {
    const cart = {
      cartId: this.cartId,
      productId: product._id,
      quantity: 0,
      action: 'remove',
    };
    const res: any = await this.http.post(`cart`, cart).toPromise();
    if (res.returncode === '200') {
      this.cartservice.updateCart(res.data);
      this.getCartItem();
    }
  }

  getTotalItems() {
    this.totalItems = this.products.reduce(
      (total, product) => total + product.quantity,
      0
    );
  }

  async getSubTotalPrice() {
    this.subtotal = this.products.reduce((total, product) => {
      const unitPrice =
        product.discountedPrice > 0 ? product.discountedPrice : product.price;
      return total + unitPrice * product.quantity;
    }, 0);
  }

  async getGrandTotalPrice() {
    this.grandTotal = this.subtotal + this.shippingFee;
  }

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
}
