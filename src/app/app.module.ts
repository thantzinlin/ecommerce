import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './admin/product/product.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { ConfirmDialogComponent } from './admin/common/confirm-dialog/confirm-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { NgImageSliderModule } from 'ng-image-slider';
import { HomeComponent } from './home/home.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductComponent,
    ProductListComponent,
    LoginComponent,
    ConfirmDialogComponent,
    DashboardComponent,
    HomeComponent,
    StarRatingComponent,
    FooterComponent,
    RegisterComponent,
    CartComponent,
    BillingDetailsComponent,
    ProductDetailsComponent,
    AboutComponent,
    ContactComponent,
    ImageSliderComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    // NgImageSliderModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    MatPaginatorModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
