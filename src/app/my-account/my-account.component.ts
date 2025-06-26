import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css',
})
export class MyAccountComponent {
  userData = {
    name: 'Thant',
    email: 'th************@gmail.com',
    receiveSMS: false,
    receiveEmails: false,
  };

  addressBook = {
    shippingAddress: {
      name: 'Thant Zin Lin',
      address:
        'BaNyar Dala Road, Near Shin Par Ku Hospital, Building 444(B), 4th floor',
      city: 'Yangon - Yangon City - Tamwe',
      phone: '(+95) 9798630172',
    },
    billingAddress: {
      name: 'Thant Zin Lin',
      address:
        'BaNyar Dala Road, Near Shin Par Ku Hospital, Building 444(B), 4th floor',
      city: 'Yangon - Yangon City - Tamwe',
      phone: '(+95) 9798630172',
    },
  };

  recentOrders = [
    {
      orderNumber: '202045418478399',
      date: '03/12/2022',
      items: 1,
      total: 'Ks 16,695',
    },
    {
      orderNumber: '202143919878399',
      date: '03/12/2022',
      items: 2,
      total: 'Ks 17,695',
    },
  ];
}
