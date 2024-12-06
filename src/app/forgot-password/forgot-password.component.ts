import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  email: string = '';
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private toast: ToastrService,
    private authService: AuthService
  ) {}

  async onSubmit() {
    if (!this.email) {
      this.toast.info('Please enter a valid email address.', 'Error');
    }
    const res: any = await this.apiservice
      .post(`auth/forgotpassword`, { to: this.email })
      .toPromise();
    if (res.returncode === '200') {
      this.toast.success(
        'A password reset link has been sent to your email.',
        'Success'
      );
    }
  }
}
