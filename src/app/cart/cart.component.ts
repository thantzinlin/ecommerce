import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  products = [
    {
      id: 1, // Unique identifier for the product
      name: 'Coca-Cola',
      description: 'Product description goes here.',
      price: 19.99,
      image: 'assets/images/img1.jpg',
      quantity: 1,
      subtotal: 19.99,
    },
    {
      id: 2, // Unique identifier for the product
      name: 'Product 2',
      description: 'Another product description.',
      price: 29.99,
      image: 'assets/images/img2.jpg',
      quantity: 1,
      subtotal: 29.99,
    },
    {
      id: 3, // Unique identifier for the product
      name: 'Camera',
      description: 'Yet another product description.',
      price: 9.99,
      image: 'assets/images/img3.jpg',
      quantity: 1,
      subtotal: 9.99,
    },
    // Add more products as needed
  ];

  couponCode: string = '';
  shippingFee = '5.0';
  couponApplied: boolean = false;
  couponDiscount: number = 50;
  constructor(private router: Router) {}
  applyCoupon() {
    // Simulate a coupon validation process (replace with your actual logic)
    if (this.couponCode === 'COUPON123') {
      this.couponApplied = true;
      // Calculate the discount based on your coupon logic
      // For example, you can set a fixed discount or percentage off
      // For this example, we use a fixed 10% discount
      this.applyCouponDiscount();
    } else {
      this.couponApplied = false;
      // Handle invalid coupon or display a message to the user
      // For this example, we'll reset the discount
      this.resetCouponDiscount();
    }
  }

  applyCouponDiscount() {
    // Calculate and apply the discount to each product subtotal
    this.products.forEach((product) => {
      const discountAmount = (product.price * this.couponDiscount) / 100;
      product.subtotal = (product.price - discountAmount) * product.quantity;
    });
  }

  resetCouponDiscount() {
    // Reset the discount by recalculating the product subtotals without the coupon
    this.products.forEach((product) => {
      product.subtotal = product.price * product.quantity;
    });
  }

  incrementQuantity(product: any) {
    product.quantity++;
  }

  decrementQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  calculateSubtotal(product: any) {
    return (product.price * product.quantity).toFixed(2);
  }

  removeProduct(product: any) {
    const productIdToRemove = product.id;
    const index = this.products.findIndex((p) => p.id === productIdToRemove);
    if (index !== -1) {
      const updatedProducts = [...this.products];
      updatedProducts.splice(index, 1);
      this.products = updatedProducts;
    }
  }

  getTotalItems() {
    return this.products.reduce(
      (total, product) => total + product.quantity,
      0
    );
  }

  getTotalPrice() {
    return this.products
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  }
  getGrandTotalPrice() {
    const subtotal = this.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    const grandTotal = subtotal + parseFloat(this.shippingFee);
    return grandTotal.toFixed(2);
  }

  updateSubtotal(index: number) {
    const product = this.products[index];
    product.subtotal = parseFloat(
      (product.price * product.quantity).toFixed(2)
    );
  }
  updateQuantity(newQuantity: number, index: number) {
    if (newQuantity >= 0) {
      this.products[index].quantity = newQuantity;
      this.updateSubtotal(index);
    }
  }

  goCheckoutPage() {
    localStorage.setItem('grandtotal', this.getGrandTotalPrice());
    this.router.navigate(['billing-details']);
  }

  // cart: Product[] = [];

  // constructor(private cartService: CartService) {
  //   this.cart = this.cartService.getCart();
  // }

  // removeItemFromCart(product: Product) {
  //   this.cartService.removeItemFromCart(product);
  // }
}
