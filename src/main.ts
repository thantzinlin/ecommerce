import {
  DEFAULT_CURRENCY_CODE,
  enableProdMode,
  importProvidersFrom,
  LOCALE_ID,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'Ks' }, // set global currency
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      ToastrModule.forRoot(),
      AppRoutingModule
    ),
  ],
}).catch((err) => console.error(err));
