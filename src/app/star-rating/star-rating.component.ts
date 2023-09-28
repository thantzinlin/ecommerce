import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = 0; // Default to 0 stars
  @Input() starColor: string = '#FFAD33'; // Default star color
  @Input() starFill: string = '#FFAD33'; // Default star fill color

  starArray: number[] = [];

  ngOnInit(): void {
    this.starArray = Array(5)
      .fill(0)
      .map((_, index) => index);
  }
}
