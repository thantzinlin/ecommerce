import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { MyReviewComponent } from './my-review/my-review.component';
import { MyCancellationComponent } from './my-cancellation/my-cancellation.component';
import { MyAccountComponent } from './my-account/my-account.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },

  { path: 'billing-details', component: BillingDetailsComponent },

  // { path: 'admin/product-list', component: ProductListComponent },
  // { path: 'admin/product', component: ProductComponent },
  { path: 'my-order', component: MyOrderComponent },
  { path: 'my-review', component: MyReviewComponent },
  { path: 'my-cancellation', component: MyCancellationComponent },
  { path: 'my-account', component: MyAccountComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'resetpassword/:resettoken', component: ResetPasswordComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
