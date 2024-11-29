import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  async fetchOrders() {
    const res: any = await firstValueFrom(this.http.get(`orders`));

    if (res.returncode === '200') {
      this.orders = res.data;
      console.log('order data' + this.orders);
    }
  }

  viewOrder(orderId: string): void {
    this.router.navigate(['/order-details', orderId]);
  }
}
