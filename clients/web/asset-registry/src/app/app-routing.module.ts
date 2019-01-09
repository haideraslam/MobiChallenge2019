// =================================== Imports ====================================== //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// =================================== Imports ====================================== //

// =================================== Components =================================== //
import { LoginComponent } from './authentication/login/login.component';
import { LoggedInComponent } from './authentication/logged-in/logged-in.component';
import { CarLookupComponent } from './manufacturer/car-lookup/car-lookup.component';
import { ApplicationQueueComponent } from './finance-company/application-queue/application-queue.component';
import { InventoryComponent } from './finance-company/inventory/inventory.component';
import { AllocateCarComponent } from './finance-company/allocate-car/allocate-car.component';
import { FinanceCompanyCarDetailsComponent } from './finance-company/finance-company-car-details/finance-company-car-details.component';
import { ManufacturerCarDetailsComponent } from './manufacturer/manufacturer-car-details/manufacturer-car-details.component';
import { AllocateCarManufacturerComponent } from './manufacturer/allocate-car-manufacturer/allocate-car-manufacturer.component';
import {
  AllocateCarToUsecaseComponent,
  DashboardComponent,
  FleetOwnerCarDetailsComponent,
  TripsComponent,
  WalletComponent,
  TrackFleetComponent
} from './fleet-owner/components';
// =================================== Components =================================== //

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'loggedIn', component: LoggedInComponent },
  {
    path: 'manufacturer', children: [
      { path: '', redirectTo: 'car-lookup', pathMatch: 'full' },
      { path: 'car-lookup', component: CarLookupComponent },
      { path: 'allocate-car', component: AllocateCarManufacturerComponent },
      { path: 'car-details/:id', component: ManufacturerCarDetailsComponent },
      { path: '**', component: CarLookupComponent }
    ]
  },
  {
    path: 'finance-company', children: [
      { path: '', redirectTo: 'application-queue', pathMatch: 'full' },
      { path: 'application-queue', component: ApplicationQueueComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'allocate-multiple-cars', component: AllocateCarComponent },
      { path: 'car-details/:id', component: FinanceCompanyCarDetailsComponent },
      { path: '**', component: ApplicationQueueComponent }
    ]
  },
  {
    path: 'fleet-owner', children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'allocate-cars-to-usecase', component: AllocateCarToUsecaseComponent },
      { path: 'car-details/:id/:token', component: FleetOwnerCarDetailsComponent },
      { path: 'track-fleet', component: TrackFleetComponent },
      { path: 'trips', component: TripsComponent },
      { path: 'wallet', component: WalletComponent },
      { path: '**', component: AllocateCarToUsecaseComponent }
    ]
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
