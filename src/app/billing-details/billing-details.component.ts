import { Component } from '@angular/core';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css'],
})
export class BillingDetailsComponent {
  billingInfo = {
    name: '',
    companyname: '',
    billingAddress: '',
    billingAddressdetail: '',
    email: '',
    phone: '',
    city: '',
    cardNumber: '',
    // Add more properties for other billing details
  };
}
