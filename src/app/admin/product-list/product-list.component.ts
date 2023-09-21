import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  confirmmsg = 'Are your Sure';
  data: any[] = [];

  pagObj = { page: 1, limit: 10, totalPages: 1, count: 0, search: '' };
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.fetchProducts();
  }
  onPageChange(e: any) {
    this.pagObj.page = e.pageIndex + 1;
    this.pagObj.limit = e.pageSize;
    this.fetchProducts();
  }
  async fetchProducts() {
    try {
      const res: any = await this.apiservice
        .getAll(`product/getall`, this.pagObj)
        .toPromise();
      if (res) {
        this.products = res.data;
        this.pagObj.totalPages = res.totalPages;
        this.pagObj.count = res.count;
      }
    } catch (error) {
      console.error('An error occurred while fetching products:', error);
    }
  }
  async goDelete(id: string) {
    try {
      const res: any = await this.apiservice
        .delete(`product/delete?id=${id}`)
        .toPromise();
      if (res) {
        this.products = res.data;
        this.toast.success('Product deleted successfully!', 'Success');
      }
    } catch (error) {
      this.toast.error('Error occurred while deleting the product.', 'Error');
      console.error('An error occurred while fetching products:', error);
    }
  }

  deleteProduct(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this product?',
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.goDelete(id);
        this.fetchProducts();
      }
    });
  }

  editProduct(id: any): void {
    localStorage.setItem('id', id);
    this.router.navigate(['admin/product']);
  }

  createNew(): void {
    this.router.navigate(['admin/product']);
  }

  // nextPage() {
  //   if (this.currentPage < this.getTotalPages()) {
  //     this.currentPage++;
  //     this.fetchProducts();
  //   }
  // }

  // prevPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.fetchProducts();
  //   }
  // }

  // getTotalPages(): number {
  //   return Math.ceil(this.totalItems / this.itemsPerPage);
  // }
}
