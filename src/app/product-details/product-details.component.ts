import { Product } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  relatedProducts!: Product[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Get the product ID from the route parameters
    const productId = this.route.snapshot.params['id'];

    // this.product = this.productService.getProductById(productId);

    // this.relatedProducts = this.productService.getRelatedProducts(productId);
  }
  imageObject = [
    {
      image: 'assets/images/img16.jpg',
      thumbImage: 'assets/images/img16.jpg',
    },
    {
      image: 'assets/images/img17.jpg',
      thumbImage: 'assets/images/img17.jpg',
    },
    {
      image: 'assets/images/img17.jpg',
      thumbImage: 'assets/images/img17.jpg',
    },
    {
      image: 'assets/images/img18.jpg',
      thumbImage: 'assets/images/img18.jpg',
    },
  ];

  addToCart(product: Product): void {
    // Add the selected product to the cart
    this.cartService.addToCart(product);

    // Redirect to the cart page or show a success message
    this.router.navigate(['/cart']);
  }
}
