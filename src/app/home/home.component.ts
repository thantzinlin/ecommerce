import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../services/cart.service';
import { Product } from '../model/product.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  targetDate: Date = new Date('2023-10-18T00:00:00'); // Replace with your flash sale end date
  countdown: string = '';
  products: any[] = [];
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
  // products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Coca-Cola',
  //     description: 'Product description goes here.',
  //     price: 19.99,
  //     image: 'assets/images/img1.jpg',
  //     quantity: 1,
  //     // subtotal: 19.99,
  //   },
  //   {
  //     id: 2,
  //     name: 'Product 2',
  //     description: 'Another product description.',
  //     price: 29.99,
  //     image: 'assets/images/img2.jpg',
  //     quantity: 1,
  //     // subtotal: 29.99,
  //   },
  //   {
  //     id: 3,
  //     name: 'Camera',
  //     description: 'Yet another product description.',
  //     price: 9.99,
  //     image: 'assets/images/img3.jpg',
  //     quantity: 1,
  //     // subtotal: 9.99,
  //   },
  //   {
  //     id: 4,
  //     name: 'Camera',
  //     description: 'Yet another product description.',
  //     price: 9.99,
  //     image: 'assets/images/img3.jpg',
  //     quantity: 1,
  //     // subtotal: 9.99,
  //   },
  //   {
  //     id: 5,
  //     name: 'Camera',
  //     description: 'Yet another product description.',
  //     price: 9.99,
  //     image: 'assets/images/img3.jpg',
  //     quantity: 1,
  //     // subtotal: 9.99,
  //   },
  //   {
  //     id: 6,
  //     name: 'Camera',
  //     description: 'Yet another product description.',
  //     price: 9.99,
  //     image: 'assets/images/img3.jpg',
  //     quantity: 1,
  //     // subtotal: 9.99,
  //   },
  //   {
  //     id: 7,
  //     name: 'Camera',
  //     description: 'Yet another product description.',
  //     price: 9.99,
  //     image: 'assets/images/img3.jpg',
  //     quantity: 1,
  //     // subtotal: 9.99,
  //   },
  //   {
  //     id: 8,
  //     name: 'Camera',
  //     description: 'Yet another product description.',
  //     price: 9.99,
  //     image: 'assets/images/img3.jpg',
  //     quantity: 1,
  //     // subtotal: 9.99,
  //   },
  // ];
  constructor(
    private router: Router,
    private cartService: CartService,
    private apiservice: ApiService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.updateCountdown();
    this.fetchProducts();
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
      image: 'assets/images/img16.jpg',
      thumbImage: 'assets/images/img16.jpg',
      title: 'Hummingbirds are amazing creatures',
    },
    {
      image: 'assets/images/img17.jpg',
      thumbImage: 'assets/images/img17.jpg',
    },
    {
      image: 'assets/images/img18.jpg',
      thumbImage: 'assets/images/img18.jpg',
      title: 'Example two with title.',
    },
  ];

  // async fetchProducts() {
  //   try {
  //     const res: any = this.apiservice.get(
  //       `products?page=1&perPage=10&search=`
  //     );
  //     if (res) {
  //       console.log('response data:' + JSON.stringify(res));
  //       this.products = res.data;
  //       this.pagObj.totalPages = res.totalPages;
  //       this.pagObj.count = res.count;
  //     }
  //   } catch (error) {
  //     console.error('An error occurred while fetching products:', error);
  //   }
  // }

  async fetchProducts() {
    try {
      const res: any = await this.apiservice
        .get(`products?page=1&perPage=10&search=`)
        .toPromise();

      if (res) {
        this.products = res.data;
      }
    } catch (error) {
      this.toast.error('An error occurred while fetching products', 'Error');

      console.error('An error occurred while fetching products', error);
    }
  }

  // etData(): void {
  //   this.apiservice.get('products?page=1&perPage=10&search=').subscribe(
  //     (data) => {
  //       this.products = data;
  //       console.log(data);
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
  productInCart(product: any): number {
    return this.cartService.getProductQuantityInCart(product);
  }
}
