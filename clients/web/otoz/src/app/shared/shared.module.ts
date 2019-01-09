// =================================== Imports ====================================== //
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SafePipe } from '../safe.pipe';
// =================================== Imports ====================================== //

// =================================== Imports - Material =========================== //
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgmCoreModule } from '@agm/core';
// =================================== Imports - Material =========================== //

// =================================== Imports - Prime NG =========================== //
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
// =================================== Imports - Prime NG =========================== //

// =================================== Modules ====================================== //
// =================================== Modules ====================================== //

// =================================== Services ===================================== //
import { HttpService } from './services/http/http.service';
import { SharedDataService } from './services/shared-data/shared-data.service';
// =================================== Services ===================================== //

// =================================== Components =================================== //
import { HomeComponent } from './component/home/home.component';
import { CarListComponent } from './component/car-list/car-list.component';
import { ConfirmBookingComponent } from './component/confirm-booking/confirm-booking.component';
import { RentalAgreementComponent } from './component/rental-agreement/rental-agreement.component';
import { SearchBarTopComponent } from './component/search-bar-top/search-bar-top.component';
import { TransactionHistoryComponent } from './component/transaction-history/transaction-history.component';
import { WalletComponent } from './component/wallet/wallet.component';
// =================================== Components =================================== //

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    ChartModule,
    ToastModule,
    RatingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDTzi1Zo4L_2h0IzLgnJkKftA7sOeX6tvM'
    })
  ],
  declarations: [HomeComponent, CarListComponent, ConfirmBookingComponent, RentalAgreementComponent, SearchBarTopComponent, TransactionHistoryComponent, SafePipe, WalletComponent],
  exports: [HomeComponent, CarListComponent, ConfirmBookingComponent, RentalAgreementComponent, SearchBarTopComponent, TransactionHistoryComponent],
  providers: [HttpService, SharedDataService]
})
export class SharedModule { }
