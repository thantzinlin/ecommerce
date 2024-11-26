import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
//import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

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
    //this.socket = io(environment.socketUrl);
  }

  isDefaultChecked: boolean = true;
  isRadio1Checked: boolean = false;

  async getCartItem() {
    const res: any = await this.http.get(`cart`).toPromise();

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
  async placeOrder() {
    const data = {
      products: this.products.map((product: any) => ({
        productId: product._id,
        quantity: product.quantity,
        price: product.price,
        discount: product.discount || 0,
        subtotal: product.quantity * product.price - (product.discount || 0),
      })),
      totalPrice: this.getTotalPrice(),
      paymentMethod: this.isDefaultChecked ? 'Cash on Delivery' : 'KBZ Pay',
      orderDate: new Date().toISOString(),
      shippingAddress: this.user.address,
    };

    const res: any = await this.http.post(`orders`, data).toPromise();

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
}
