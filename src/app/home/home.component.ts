import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../services/cart.service';
import { Product } from '../model/product.model';
import { FormsModule } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  targetDate: Date = new Date('2023-10-18T00:00:00'); // Replace with your flash sale end date
  countdown: string = '';
  searchQuery: string = '';
  products: any[] = [];
  categories: any[] = [];

  pagObj = { page: 1, limit: 10, totalPages: 1, count: 0, search: '' };

  sliderImages = [
    {
      url: 'https://res.cloudinary.com/dsdemersd/image/upload/v1727430920/cld-sample-5.jpg',
      alt: 'Image 1',
    },
    {
      url: 'https://res.cloudinary.com/dsdemersd/image/upload/v1727430908/sample.jpg',
      alt: 'Image 2',
    },
    {
      url: 'https://res.cloudinary.com/dsdemersd/image/upload/v1727430919/cld-sample-4.jpg',
      alt: 'Image 3',
    },
  ];

  constructor(
    private route: ActivatedRoute,

    private cartService: CartService,
    private apiService: ApiService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.updateCountdown();
    this.getProducts();
    this.getCategories();
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      this.getProducts(this.searchQuery);
    });

    const token = localStorage.getItem('token');
    if (token) {
      this.getCartItemCount();
    }
    setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  async getCartItemCount() {
    const res: any = await this.apiService.get(`cart/count`).toPromise();

    if (res.returncode === '200') {
      this.cartService.updateCart(res.data);
    }
  }

  updateCountdown() {
    const currentDate: Date = new Date();
    const timeLeft: number = this.targetDate.getTime() - currentDate.getTime();

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      this.countdown =
        this.formatWithLeadingZeros(days) +
        ' : ' +
        this.formatWithLeadingZeros(hours) +
        ' : ' +
        this.formatWithLeadingZeros(minutes) +
        ' : ' +
        this.formatWithLeadingZeros(seconds);
    } else {
      this.countdown = 'Flash Sale Ended!';
    }
  }

  formatWithLeadingZeros(value: number): string {
    return value.toString().padStart(2, '0');
  }

  async getProducts(search: string = '') {
    const res: any = await firstValueFrom(
      this.apiService.get(`products?page=1&perPage=10&search=${search}`)
    );

    if (res.returncode === '200') {
      this.products = res.data;
    }
  }

  async getProductsByCategory(categoryId: string) {
    const res: any = await firstValueFrom(
      this.apiService.get(`products/categoryId/${categoryId}`)
    );
    if (res) {
      this.products = res.data;
    }
  }

  async getCategories() {
    const res: any = await this.apiService
      .get(`categories?page=1&perPage=10&search=`)
      .toPromise();

    if (res) {
      this.categories = res.data;
    }
  }

  async addToCart(product: Product) {
    const cart = { productId: product._id, quantity: 1, action: 'increase' };
    const res: any = await this.apiService.post(`cart`, cart).toPromise();
    if (res.returncode === '200') {
      this.cartService.updateCart(res.data);
      this.toast.success('Item successfully added to your cart!', 'Success');
    }
    // this.socket.emit('addToCart', '672c3d1cfa9d501bfe5a99f5', products);
    // this.cartService.addToCart(product);
  }
  // productInCart(product: any): number {
  //   return this.cartService.getProductQuantityInCart(product);
  // }
}
