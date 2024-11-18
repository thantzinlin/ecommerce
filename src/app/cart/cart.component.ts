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
  shippingFee = 5.0;
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
  // applyCoupon() {
  //   if (this.couponCode === 'COUPON123') {
  //     this.couponApplied = true;
  //     this.applyCouponDiscount();
  //   } else {
  //     this.couponApplied = false;
  //     this.resetCouponDiscount();
  //   }
  // }

  // applyCouponDiscount() {
  //   this.products.forEach((product) => {
  //     const discountAmount = (product.price * this.couponDiscount) / 100;
  //     product.subtotal = (product.price - discountAmount) * product.quantity;
  //   });
  // }

  // resetCouponDiscount() {
  //   this.products.forEach((product) => {
  //     product.subtotal = product.price * product.quantity;
  //   });
  // }
  // removeProduct(product: any) {
  //   const productIdToRemove = product.id;
  //   const index = this.products.findIndex((p) => p.id === productIdToRemove);
  //   if (index !== -1) {
  //     const updatedProducts = [...this.products];
  //     updatedProducts.splice(index, 1);
  //     this.products = updatedProducts;
  //   }
  // }

  // getTotalItems() {
  //   return this.products.reduce(
  //     (total, product) => total + product.quantity,
  //     0
  //   );
  // }

  // getTotalPrice() {
  //   return this.products
  //     .reduce((total, product) => total + product.price * product.quantity, 0)
  //     .toFixed(2);
  // }
  // getGrandTotalPrice() {
  //   const subtotal = this.products.reduce(
  //     (total, product) => total + product.price * product.quantity,
  //     0
  //   );

  //   const grandTotal = subtotal + parseFloat(this.shippingFee);
  //   return grandTotal.toFixed(2);
  // }

  // updateSubtotal(index: number) {
  //   const product = this.products[index];
  //   product.subtotal = parseFloat(
  //     (product.price * product.quantity).toFixed(2)
  //   );
  // }
  // updateQuantity(newQuantity: number, index: number) {
  //   if (newQuantity >= 0) {
  //     this.products[index].quantity = newQuantity;
  //     this.updateSubtotal(index);
  //   }
  // }

  // goCheckoutPage() {
  //   localStorage.setItem('grandtotal', this.getGrandTotalPrice());
  //   this.router.navigate(['billing-details']);
  // }
}
