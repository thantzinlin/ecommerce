import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { ConfirmDialogComponent } from '../admin/common/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private isAuthenticated = false;

  user = {
    email: '',
    password: '',
  };
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private toast: ToastrService,
    private authService: AuthService
  ) {}

  async gologin() {
    try {
      const res: any = await this.apiservice
        .post(`users/login`, this.user)
        .toPromise();
      if (res) {
        this.user = res.data;
        this.router.navigate(['/dashboard']);
        this.authService.login();
      }
    } catch (error) {
      this.isAuthenticated = false;
      this.toast.error('Unauthorised Access.', 'Error');

      console.error('An error occurred while Login', error);
    }
  }
  is_Authenticated(): boolean {
    return this.isAuthenticated;
  }
}
