import { Product } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  async getProductByID(productId: string) {
    const res: any = await this.apiService
      .get(`products/details/${productId}`)
      .toPromise();

    if (res) {
      this.product = res.data;
    }
  }
  async addToCart(product: Product) {
    const cart = {
      productId: this.productId,
      quantity: this.quantity,
      action: 'update',
    };
    const res: any = await this.apiService.post(`cart`, cart).toPromise();
    if (res.returncode === '200') {
      this.cartService.updateCart(res.data);
      this.toast.success('Item successfully added to your cart!', 'Success');
    }
    // this.socket.emit('addToCart', '672c3d1cfa9d501bfe5a99f5', products);
    // this.cartService.addToCart(product);
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
    this.addToCart(this.product);
    this.router.navigate(['/checkout']);
  }
}
