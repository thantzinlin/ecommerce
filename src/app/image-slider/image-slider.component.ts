import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
})
export class ImageSliderComponent implements OnInit {
  @Input() images: { url: string; alt?: string }[] = [];
  @Input() interval: number = 3000; // Carousel interval in milliseconds

  activeIndex = 0;
  imageMaxHeight = 400;
  ngOnInit(): void {
    if (this.images.length > 0 && this.interval > 0) {
      setInterval(() => this.nextSlide(), this.interval);
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
