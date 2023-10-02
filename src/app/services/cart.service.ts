import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  private cart: Product[] = [];

  addToCart(product: Product) {
    const existingProduct = this.cart.find((p) => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  getCart() {
    return this.cart;
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
}
