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
import { CarLookupService } from './service/car-lookup/car-lookup.service';
import { AllocateCarService } from './service/alloate-car/allocate-car.service';
// =================================== Services ===================================== //

// =================================== Components =================================== //
import { MenuComponent } from './menu/menu.component';
import { CarLookupComponent } from './car-lookup/car-lookup.component';
import { ManufacturerCarDetailsComponent } from './manufacturer-car-details/manufacturer-car-details.component';
import { AllocateCarManufacturerComponent } from './allocate-car-manufacturer/allocate-car-manufacturer.component';
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
  declarations: [CarLookupComponent, ManufacturerCarDetailsComponent, MenuComponent, AllocateCarManufacturerComponent],
  exports: [CarLookupComponent, ManufacturerCarDetailsComponent, AllocateCarManufacturerComponent],
  providers: [CarLookupService, AllocateCarService]
})
export class ManufacturerModule { }
