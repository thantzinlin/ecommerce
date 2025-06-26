import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-cancellation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './my-cancellation.component.html',
  styleUrl: './my-cancellation.component.css',
})
export class MyCancellationComponent implements OnInit {
  constructor(
    private router: Router,
    private http: ApiService,
    private toast: ToastrService
  ) {}
  cancelledOrders: any[] = [];

  ngOnInit(): void {
    this.fetchMyCancellations();
  }

  async fetchMyCancellations() {
    try {
      const res: any = await firstValueFrom(this.http.get(`orders/cancel`));
      if (res.returncode === '200') {
        this.cancelledOrders = res.data;
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }
}
