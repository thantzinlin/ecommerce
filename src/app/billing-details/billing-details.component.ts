import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
//import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css'],
})
export class BillingDetailsComponent implements OnInit {
  products: any[] = [];
  shippingFee = 1500.0;
  couponCode = '';
  user: any;
  //private socket!: Socket;

  constructor(
    private router: Router,
    private cartService: CartService,
    private http: ApiService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCartItem();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getCities();
    //this.socket = io(environment.socketUrl);
  }

  cities: any[] = [];
  townships: any[] = [];

  async getCities() {
    const res: any = await firstValueFrom(this.http.get(`cities`));

    if (res.returncode === '200') {
      this.cities = res.data;
    }
  }

  async getTownships(cityId: string) {
    const res: any = await firstValueFrom(
      this.http.get(`townships/city/${cityId}`)
    );

    if (res.returncode === '200') {
      this.townships = res.data;
      //  this.selectedTownships = res.data;
      // this.billingInfo.township = '';
    }
  }

  selectedTownships: any[] = [];

  billingInfo = {
    street: '',
    city: '',
    township: '',
    postalCode: '',
  };
  onCityChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    const selectedCity = target?.value || '';
    const city = this.cities.find((c) => c.name === selectedCity);
    if (city) {
      this.billingInfo.township = '';
      this.billingInfo.city = city.name;
      this.getTownships(city._id);
    }
  }

  isDefaultChecked: boolean = true;
  isRadio1Checked: boolean = false;

  async getCartItem() {
    const res: any = await firstValueFrom(this.http.get(`cart`));

    if (res.returncode === '200') {
      this.products = res.data.products;
    }
  }
  getTotalPrice(): number {
    return this.products.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  }

  getGrandTotalPrice(): number {
    return this.getTotalPrice() + this.shippingFee;
  }
  async placeOrder(form: NgForm) {
    const data = {
      products: this.products.map((product: any) => ({
        productId: product._id,
        quantity: product.quantity,
        price: product.price,
        discount: product.discount || 0,
        subtotal: product.quantity * product.price - (product.discount || 0),
      })),
      totalPrice: this.getTotalPrice(),
      shippingAddress: this.billingInfo,
      billingAddress: this.billingInfo,
      paymentMethod: this.isDefaultChecked ? 'Cash on Delivery' : 'KBZ Pay',
      orderDate: new Date().toISOString(),
    };

    const res: any = await firstValueFrom(this.http.post(`orders`, data));

    if (res.returncode === '200') {
      // const notiData = {
      //   userId: this.user._id,
      //   type: 'order',
      //   message: `New order received: `,
      // };
      // this.socket.emit('newOrder', notiData);

      this.toast.success('Order placed successfully!');
      this.router.navigate(['/order-success']);
    } else {
      this.toast.error('Failed to place the order. Please try again.');
    }
  }
  formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
  goBack() {
    this.router.navigate(['/home']);
  }
}
