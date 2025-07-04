import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
//import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { FormsModule, NgForm } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;
@Component({
  selector: 'app-billing-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css'],
})
export class BillingDetailsComponent implements OnInit {
  products: any[] = [];
  shippingFee: number = 0;
  subTotal: number = 0;
  grandTotal: number = 0;
  couponCode = '';
  user: any;
  billingInfo: any;
  //private socket!: Socket;

  constructor(
    private router: Router,
    private cartService: CartService,
    private http: ApiService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.shippingFee = 2000.0;
    this.getCartItem();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getCities();
    //this.socket = io(environment.socketUrl);
    this.billingInfo = {
      name: this.user.username || '',
      phone: this.user.phone || '',
      email: this.user.email || '',
      remarks: '',
      street: '',
      city: '',
      township: '',
      postalCode: '',
    };
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
    }
  }

  selectedTownships: any[] = [];

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
    const cartId = localStorage.getItem('cartId')?.toString();
    const res: any = await firstValueFrom(
      this.http.get(`cart?cartId=${cartId}`)
    );

    if (res.returncode === '200') {
      this.products = res.data.products;
      this.getSubTotalPrice();
      this.getGrandTotalPrice();
    }
  }
  async getSubTotalPrice() {
    this.subTotal = this.products.reduce((total, product) => {
      const unitPrice =
        product.discountedPrice > 0 ? product.discountedPrice : product.price;
      return total + unitPrice * product.quantity;
    }, 0);
  }

  getGrandTotalPrice() {
    this.grandTotal = this.subTotal + this.shippingFee;
  }
  async placeOrder(form: NgForm) {
    const userId = this.user._id
      ? this.user._id
      : localStorage.getItem('userId')?.toString();
    const data = {
      userId: userId,
      cartId: localStorage.getItem('cartId')?.toString(),
      products: this.products.map((product: any) => ({
        productId: product._id,
        quantity: product.quantity,
        price: product.price,
        discount: product.discountedPrice || 0,
        subtotal:
          product.quantity * product.price - (product.discountedPrice || 0),
      })),
      totalAmount: this.grandTotal,
      shippingAddress: this.billingInfo,
      shippingCharge: this.shippingFee,
      subTotal: this.subTotal,
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
      localStorage.setItem('userId', res.data.userId);
      this.cartService.updateCart(0);

      localStorage.removeItem('cartId');
      const modal = new bootstrap.Modal(
        document.getElementById('orderSuccessModal')
      );
      modal.show();
      this.router.navigate(['/home']);
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
