import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
// import { ProductService } from 'path/to/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  isLoading: boolean = false;

  product: any = {
    name: '',
    price: '',
    description: '',
  };
  id: any = '';
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private toast: ToastrService
  ) {}
  ngOnInit() {
    this.id = localStorage.getItem('id');
    console.log(JSON.stringify(this.id));
    if (this.id != null) {
      this.getProductByid();
    }
  }
  ngOnDestroy() {
    localStorage.removeItem('id');
  }
  async getProductByid() {
    try {
      const res: any = await this.apiservice
        .get(`product/getbyid?id=${this.id}`)
        .toPromise();
      if (res) {
        this.product = res.data;
      }
    } catch (error) {
      console.error('An error occurred while fetching products:', error);
    }
  }

  createOrUpdate() {
    if (this.id != null) {
      this.updateProduct();
      this.goList();
    } else {
      this.createProduct();
      this.goList();
    }
  }

  goList() {
    this.router.navigate(['admin/product-list']);
  }

  async updateProduct() {
    try {
      this.isLoading = true;
      const res: any = await this.apiservice
        .put(`product/update`, this.product)
        .toPromise();
      if (res) {
        this.product = res.data;
        this.isLoading = false;
        this.toast.success('Product updated successfully!', 'Success');
      }
    } catch (error) {
      this.toast.error('Error occurred while updating the product.', 'Error');
      console.error('An error occurred while updating the product:', error);
    }
  }

  async createProduct() {
    try {
      const res: any = await this.apiservice
        .post(`product/create`, this.product)
        .toPromise();
      if (res) {
        this.product = res.data;
        this.toast.success('Product created successfully!', 'Success');
      }
    } catch (error) {
      this.toast.error('Error occurred while creating the product.', 'Error');
      console.error('An error occurred while creating the product:', error);
    }
  }
}
