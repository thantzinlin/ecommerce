import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { ApiService } from 'src/app/api.service';
import { ConfirmDialogComponent } from '../admin/common/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
  };
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private toast: ToastrService,
    private authService: AuthService
  ) {}

  async goRegister() {
    try {
      this.user = {
        name: '',
        email: '',
        password: '',
      };
      const res: any = await this.apiservice
        .post(`users/register`, this.user)
        .toPromise();
      if (res) {
        this.user = res.data;
        this.router.navigate(['/dashboard']);
        this.authService.login();
      }
    } catch (error) {
      // this.isAuthenticated = false;
      this.toast.error('Unauthorised Access.', 'Error');

      console.error('An error occurred while Register', error);
    }
  }
}
