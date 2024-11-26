import { ApiService } from 'src/app/api.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../admin/common/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private isAuthenticated = false;

  user = {
    phone: '',
    email: '',
    password: '',
  };
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private toast: ToastrService,
    private authService: AuthService
  ) {}

  async goLogin(form: NgForm) {
    const res: any = await this.apiservice
      .post(`auth/login`, this.user)
      .toPromise();
    if (res.returncode === '200') {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));

      // Retrieve user data when the app loads
      this.router.navigate(['/home']);
    }
  }

  // async gologin() {
  //   const res: any = await firstValueFrom(
  //     this.http.post(`http:localhost:5000/api/auth/login`, this.user)
  //   );
  //   if (res.returncode === '200') {
  //     localStorage.setItem('token', res.data.token);
  //     localStorage.setItem('user', JSON.stringify(res.data));

  //     // Retrieve user data when the app loads
  //     this.router.navigate(['/home']);
  //   }
  // }
}
