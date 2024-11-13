import { ApiService } from 'src/app/api.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../admin/common/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private isAuthenticated = false;

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

  async gologin() {
    try {
      // this.user = {
      //   name: '',
      //   email: '',
      //   password: '',
      // };
      const res: any = await this.apiservice
        .post(`auth/login`, this.user)
        .toPromise();
      if (res.returncode === '200') {
        localStorage.setItem('token', res.token);

        this.router.navigate(['/home']);
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
