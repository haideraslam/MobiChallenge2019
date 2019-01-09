// =================================== Imports ====================================== //
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
// =================================== Imports - Prime NG =========================== //

// =================================== Modules ====================================== //
import { ApplicationLayoutModule } from '../application-layout/application-layout.module';
import { SharedModule } from '../shared/shared.module';
// =================================== Modules ====================================== //

// =================================== Services ===================================== //
import { ApplicationQueueService } from './service/application-queue/application-queue.service';
import { AllocateCarService } from './service/allocate-car/allocate-car.service';
// =================================== Services ===================================== //

// =================================== Components =================================== //
import { ApplicationQueueComponent } from './application-queue/application-queue.component';
import { AllocateCarComponent } from './allocate-car/allocate-car.component';
import { InventoryComponent } from './inventory/inventory.component';
import { FinanceCompanyCarDetailsComponent } from './finance-company-car-details/finance-company-car-details.component';
import { MenuComponent } from './menu/menu.component';
// =================================== Components =================================== //

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    ButtonModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    GrowlModule,
    InputTextModule,
    TabViewModule,
    TooltipModule,

    ApplicationLayoutModule,
    SharedModule
  ],
  declarations: [ApplicationQueueComponent, AllocateCarComponent, InventoryComponent, FinanceCompanyCarDetailsComponent, MenuComponent],
  exports: [ApplicationQueueComponent, AllocateCarComponent, InventoryComponent, FinanceCompanyCarDetailsComponent],
  providers: [ApplicationQueueService, AllocateCarService]
})
export class FinanceCompanyModule { }
