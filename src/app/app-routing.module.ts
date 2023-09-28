import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { ProductComponent } from './admin/product/product.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/product-list', component: ProductListComponent },
  { path: 'admin/product', component: ProductComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  { path: '', redirectTo: 'admin/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
