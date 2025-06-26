import { Product } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductDetailsImgSliderComponent } from '../product-details-img-slider/product-details-img-slider.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-product-details',
  imports: [
    ProductDetailsImgSliderComponent,
    CommonModule,
    FormsModule,
    StarRatingComponent,
  ],
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any = {};
  relatedProducts!: Product[];
  cart: any = {};
  productId: string = '';
  sizes: string[] = [];
  weights: string[] = [];
  colors: string[] = [];
  selectedVariant: any = null;

  selectedColor: string = '';
  selectedSize: string = '';
  selectedWeight: string = '';
  private socket!: Socket;
  public cartItemCount$ = new BehaviorSubject<number>(0);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private apiService: ApiService,
    private toast: ToastrService
  ) {
    //add to cart with socket io
    // this.socket = io(environment.socketUrl);
    // const userId = '672c3d1cfa9d501bfe5a99f5';
    // this.socket.on('connect', () => {
    //   const userId = '672c3d1cfa9d501bfe5a99f5';
    //   this.socket.emit('joinRoom', userId);
    //   console.log(`User ${userId} joined room.`);
    // });
    // this.socket.on('updateCartCount', (count) => {
    //   console.log('Received updateCartCount:', count);
    //   this.cartService.updateCart(count);
    // });
  }
  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.product = this.getProductByID(this.productId);
  }
  images = [{ url: '' }];
  async getProductByID(productId: string) {
    const res: any = await this.apiService
      .get(`products/details/${productId}`)
      .toPromise();

    if (res) {
      this.product = res.data;
      const variants = this.product.variants as {
        size: string;
        weight: string;
        color: string;
      }[];

      if (variants && variants.length > 0) {
        this.selectedVariant = variants[0];
      }
      //  this.images = this.product.images || [];
      this.images =
        this.product.images?.map((imageUrl: any) => ({
          url: imageUrl,
          alt: '',
        })) || [];

      this.sizes = [...new Set(variants.map((v) => v.size).filter(Boolean))];
      this.weights = [
        ...new Set(variants.map((v) => v.weight).filter(Boolean)),
      ];
      this.colors = [...new Set(variants.map((v) => v.color).filter(Boolean))];
      this.selectedColor = this.colors[0] || '';
      this.selectedSize = this.sizes[0] || '';
      this.selectedWeight = this.weights[0] || '';
    }
  }
  async addToCart(product: Product, showAlert: boolean) {
    const cartId = localStorage.getItem('cartId')?.toString();
    const cart = {
      cartId,
      productId: this.productId,
      variantId: this.selectedVariant?._id || null,
      quantity: this.quantity,
      action: 'update',
    };
    const res: any = await firstValueFrom(this.apiService.post(`cart`, cart));
    if (res.returncode === '200') {
      this.cartService.updateCart(res.data.count);
      localStorage.setItem('cartId', res.data.cartId);

      if (showAlert) {
        this.toast.success('Item successfully added to your cart!', 'Success');
      }
    }
    // this.socket.emit('addToCart', '672c3d1cfa9d501bfe5a99f5', products);
    // this.cartService.addToCart(product);
  }

  updateSelectedVariant(selectedValue: String) {
    if (this.product.variants && this.product.variants.length > 0) {
      this.selectedVariant = this.product.variants.find((variant: any) => {
        const opts = variant || {};
        return (
          (!this.selectedSize || opts.size === this.selectedSize) &&
          (!this.selectedColor || opts.color === this.selectedColor) &&
          (!this.selectedWeight || opts.weight === this.selectedWeight)
        );
      });
    }
  }

  quantity: number = 1;

  increaseCount() {
    this.quantity++;
  }

  decreaseCount() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  buyNow(): void {
    this.addToCart(this.product, false);
    this.router.navigate(['/billing-details']);
  }
}
