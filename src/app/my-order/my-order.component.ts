import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';

import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-my-order',
  //standalone: true,
  //imports: [],
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css',
})
export class MyOrderComponent implements OnInit {
  orders: any[] = [];
  selectedOrder: any | null = null; // Object to hold selected order details

  constructor(
    private router: Router,
    private http: ApiService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.fetchOrders();
  }
  async fetchOrders() {
    try {
      const res: any = await firstValueFrom(
        this.http.get(`orders/getByUserId`)
      );
      if (res.returncode === '200') {
        this.orders = res.data;
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }
  viewOrderDetails(orderId: string) {
    this.selectedOrder = this.orders.find((order) => order._id === orderId);
  }
}
