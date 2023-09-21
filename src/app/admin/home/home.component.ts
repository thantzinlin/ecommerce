import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  targetDate: Date = new Date('2023-09-18T00:00:00'); // Replace with your flash sale end date
  countdown: string = '';

  constructor() {}

  ngOnInit(): void {
    this.updateCountdown();
    setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown() {
    const currentDate: Date = new Date();
    const timeLeft: number = this.targetDate.getTime() - currentDate.getTime();

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      this.countdown =
        this.formatWithLeadingZeros(days) +
        ' : ' +
        this.formatWithLeadingZeros(hours) +
        ' : ' +
        this.formatWithLeadingZeros(minutes) +
        ' : ' +
        this.formatWithLeadingZeros(seconds);
    } else {
      this.countdown = 'Flash Sale Ended!';
    }
  }

  formatWithLeadingZeros(value: number): string {
    return value.toString().padStart(2, '0');
  }
  imageObject = [
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
      title: 'Hummingbirds are amazing creatures',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
      title: 'Example with title.',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
      title: 'Hummingbirds are amazing creatures',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
      title: 'Example two with title.',
    },
  ];
}
