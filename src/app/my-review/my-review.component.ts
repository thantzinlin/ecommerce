import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-my-review',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './my-review.component.html',
  styleUrl: './my-review.component.css',
})
export class MyReviewComponent implements OnInit {
  reviews: any[] = [];

  constructor(
    private router: Router,
    private http: ApiService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.fetchMyReviews();
  }

  async fetchMyReviews() {
    try {
      const res: any = await firstValueFrom(
        this.http.get(`reviews/getByUserId`)
      );
      if (res.returncode === '200') {
        this.reviews = res.data;
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }
}
