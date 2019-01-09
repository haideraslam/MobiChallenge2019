// =================================== Imports ====================================== //
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { SafePipe } from '../safe.pipe';

// =================================== Imports ====================================== //

// =================================== Imports - Prime NG =========================== //
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { GrowlModule } from 'primeng/growl';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ChartModule } from 'primeng/chart';
// =================================== Imports - Prime NG =========================== //

// =================================== Modules ====================================== //
import { ApplicationLayoutModule } from '../application-layout/application-layout.module';
import { SharedModule } from '../shared/shared.module';
// =================================== Modules ====================================== //

// =================================== Services ===================================== //
import {
  AllocateCarToUsecaseService,
  FleetOwnerWalletService,
  TripHistoryService
} from './service';
// =================================== Services ===================================== //

// =================================== Components =================================== //
import {
  AllocateCarToUsecaseComponent,
  DashboardComponent,
  FleetOwnerCarDetailsComponent,
  MenuComponent,
  TripsComponent,
  WalletComponent,
  TrackFleetComponent
} from './components';

// =================================== Components =================================== //

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDDm3X1GPJgur0gehCO32h00bl3gVcfWCY' }),
    ButtonModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    GrowlModule,
    InputTextModule,
    TabViewModule,
    TooltipModule,
    RatingModule,
    ScrollPanelModule,
    ChartModule,
    ApplicationLayoutModule,
    SharedModule
  ],
  declarations: [
    AllocateCarToUsecaseComponent,
    DashboardComponent,
    FleetOwnerCarDetailsComponent,
    MenuComponent,
    TripsComponent,
    WalletComponent,
    TrackFleetComponent,
    SafePipe
  ],
  exports: [
    AllocateCarToUsecaseComponent,
    DashboardComponent,
    FleetOwnerCarDetailsComponent,
    MenuComponent,
    TripsComponent,
    WalletComponent,
    TrackFleetComponent
  ],
  providers: [
    AllocateCarToUsecaseService,
    FleetOwnerWalletService,
    TripHistoryService
  ]
})
export class FleetOwnerModule { }
