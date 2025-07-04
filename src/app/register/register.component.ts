import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    username: '',
    phone: '',
    email: '',
    password: '',
    isRegistered: true,
    role: 'user',
  };
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private toast: ToastrService,
    private authService: AuthService
  ) {}

  async goRegister(form: NgForm) {
    const res: any = await this.apiservice
      .post(`auth/register`, this.user)
      .toPromise();
    if (res.returncode === '200') {
      this.toast.success('Register Successfull.', 'Success');
      this.router.navigate(['/login']);
    }
  }
}
