import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  resettoken: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.resettoken =
      this.activatedRoute.snapshot.url.map((segment) => segment.path).pop() ||
      '';

    if (!this.resettoken) {
      this.toast.error('Invalid or missing token.', 'Error');
      this.router.navigate(['/login']);
    }
  }

  async onSubmit() {
    if (!this.newPassword || !this.confirmPassword) {
      this.toast.warning('Please fill in both fields.', 'Warning');
      return;
    }
    if (!this.newPassword || this.newPassword.length < 6) {
      this.toast.warning(
        'Password must be at least 6 characters long.',
        'Warning'
      );
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.toast.warning('Passwords do not match!', 'Warning');
      return;
    }
    try {
      const res: any = await this.apiService
        .post('auth/resetpassword', {
          resettoken: this.resettoken,
          newpassword: this.newPassword,
        })
        .toPromise();

      if (res.returncode === '200') {
        this.toast.success('Password reset successfully.', 'Success');
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      this.toast.error('Error resetting password. Please try again.', 'Error');
    }
  }
}
