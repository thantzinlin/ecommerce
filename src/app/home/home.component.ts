import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../services/cart.service';
import { Product } from '../model/product.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  targetDate: Date = new Date('2023-10-18T00:00:00'); // Replace with your flash sale end date
  countdown: string = '';
  // products: any[] = [];
  pagObj = { page: 1, limit: 10, totalPages: 1, count: 0, search: '' };
  products: Product[] = [
    {
      id: 1,
      name: 'Coca-Cola',
      description: 'Product description goes here.',
      price: 19.99,
      image: 'assets/images/img1.jpg',
      quantity: 1,
      // subtotal: 19.99,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Another product description.',
      price: 29.99,
      image: 'assets/images/img2.jpg',
      quantity: 1,
      // subtotal: 29.99,
    },
    {
      id: 3,
      name: 'Camera',
      description: 'Yet another product description.',
      price: 9.99,
      image: 'assets/images/img3.jpg',
      quantity: 1,
      // subtotal: 9.99,
    },
  ];
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private toast: ToastrService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.updateCountdown();
    // this.fetchProducts();
    setInterval(() => {
      this.updateCountdown();
    }, 1000);
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
  imageObject = [
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
      title: 'Hummingbirds are amazing creatures',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
      title: 'Example with title.',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
      title: 'Hummingbirds are amazing creatures',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
      title: 'Example two with title.',
    },
  ];

  async fetchProducts() {
    try {
      const res: any = await this.apiservice
        .getAll(`product/getall`, this.pagObj)
        .toPromise();
      if (res) {
        this.products = res.data;
        this.pagObj.totalPages = res.totalPages;
        this.pagObj.count = res.count;
      }
    } catch (error) {
      console.error('An error occurred while fetching products:', error);
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
