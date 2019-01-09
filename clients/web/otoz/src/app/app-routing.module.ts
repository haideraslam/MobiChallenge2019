// =================================== Imports ====================================== //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// =================================== Imports ====================================== //

// =================================== Components =================================== //
import { HomeComponent } from './shared/component/home/home.component';
import { CarListComponent } from './shared/component/car-list/car-list.component';
import { ConfirmBookingComponent } from './shared/component/confirm-booking/confirm-booking.component';
import { RentalAgreementComponent } from './shared/component/rental-agreement/rental-agreement.component';
import { LoggedInComponent } from './authentication/logged-in/logged-in.component';
import { UploadDocumentsComponent } from './authentication/upload-documents/upload-documents.component';
import { TransactionHistoryComponent } from './shared/component/transaction-history/transaction-history.component';
import { WalletComponent } from './shared/component/wallet/wallet.component';
// =================================== Components =================================== //

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'loggedIn', component: LoggedInComponent },
  { path: 'upload-document', component: UploadDocumentsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'car-list', component: CarListComponent },
  { path: 'confirm-booking', component: ConfirmBookingComponent },
  { path: 'rental-agreement', component: RentalAgreementComponent },
  { path: 'transaction-history', component: TransactionHistoryComponent },
  { path: 'wallet', component: WalletComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
