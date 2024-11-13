import { Product } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any = {};
  relatedProducts!: Product[];
  cart: any = {};
  productId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private apiService: ApiService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    // Get the product ID from the route parameters
    this.productId = this.route.snapshot.params['id'];

    this.product = this.getProductByID(this.productId);

    // this.relatedProducts = this.productService.getRelatedProducts(productId);
  }

  async getProductByID(productId: string) {
    try {
      const res: any = await this.apiService
        .get(`products/details/${productId}`)
        .toPromise();

      if (res) {
        this.product = res.data;
      }
    } catch (error) {
      //  this.toast.error('An error occurred while fetching product', 'Error');

      console.error('An error occurred while fetching products', error);
    }
  }
  async addToCart(product: Product) {
    const cartData = {
      userId: '672c3d1cfa9d501bfe5a99f5',
      products: [
        {
          productId: this.productId,
          quantity: 1,
        },
      ],
    };

    const res: any = await this.apiService.post(`cart`, cartData).toPromise();

    if (res) {
      this.toast.error('Add to Cart Success', 'Success');
    }
  }

  counter: number = 0;

  increaseCount() {
    this.counter++;
  }

  decreaseCount() {
    if (this.counter > 0) {
      this.counter--;
    }
  }

  buyNow(): void {
    this.addToCart(this.product);
    this.router.navigate(['/checkout']);
  }
}
