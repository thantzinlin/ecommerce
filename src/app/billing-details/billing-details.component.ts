import { Component } from '@angular/core';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css'],
})
export class BillingDetailsComponent {
  isDefaultChecked: boolean = true;
  isRadio1Checked: boolean = false;
  billingInfo = {
    name: '',
    companyname: '',
    billingAddress: '',
    billingAddressdetail: '',
    email: '',
    phone: '',
    city: '',
    cardNumber: '',
    isChecked: true,
    // Add more properties for other billing details
  };

  products = [
    {
      id: 1, // Unique identifier for the product
      name: 'Coca-Cola',
      description: 'Product description goes here.',
      price: 19.99,
      image: 'assets/images/img1.jpg',
      quantity: 1,
      subtotal: 19.99,
    },
    {
      id: 2, // Unique identifier for the product
      name: 'Product 2',
      description: 'Another product description.',
      price: 29.99,
      image: 'assets/images/img2.jpg',
      quantity: 1,
      subtotal: 29.99,
    },
    {
      id: 3, // Unique identifier for the product
      name: 'Camera',
      description: 'Yet another product description.',
      price: 9.99,
      image: 'assets/images/img3.jpg',
      quantity: 1,
      subtotal: 9.99,
    },
    // Add more products as needed
  ];
}
