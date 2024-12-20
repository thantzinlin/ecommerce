import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private apiService: ApiService) {}

  private cart: Product[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();

  // getCart() {
  //   return this.cart;
  // }

  updateCart(count: number) {
    this.cartItemCount.next(count);
  }

  removeItemFromCart(product: Product) {
    const index = this.cart.indexOf(product);

    if (index !== -1) {
      if (product.quantity > 1) {
        product.quantity--;
      } else {
        this.cart.splice(index, 1);
      }
    }
  }

  // getProductQuantityInCart(product: Product) {
  //   const cartProduct = this.cart.find((p) => p.id === product.id);
  //   return cartProduct ? cartProduct.quantity : 0;
  // }
}
