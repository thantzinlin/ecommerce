import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details-img-slider',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-details-img-slider.component.html',
  styleUrl: './product-details-img-slider.component.css',
})
export class ProductDetailsImgSliderComponent implements OnInit, OnDestroy {
  @Input() images: { url: string; alt?: string }[] = [];
  @Input() interval: number = 3000; // Carousel interval in milliseconds

  activeIndex = 0;
  imageMaxHeight = 400;

  private intervalId: any;

  ngOnInit(): void {
    if (this.images.length > 0 && this.interval > 0) {
      this.intervalId = setInterval(() => this.nextSlide(), this.interval);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    this.activeIndex = (this.activeIndex + 1) % this.images.length;
  }

  prevSlide(): void {
    this.activeIndex =
      (this.activeIndex - 1 + this.images.length) % this.images.length;
  }

  setSlide(index: number): void {
    this.activeIndex = index;
  }
}
