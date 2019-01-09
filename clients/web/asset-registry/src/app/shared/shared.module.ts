// =================================== Imports ====================================== //
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { LightboxModule } from 'primeng/lightbox';
import { TabViewModule } from 'primeng/tabview';
// =================================== Imports - Prime NG =========================== //

// =================================== Modules ====================================== //
// =================================== Modules ====================================== //

// =================================== Services ===================================== //
import { HttpService } from './services/http/http.service';
import { SharedDataService } from './services/shared-data/shared-data.service';
import { CarDetailsService } from './services/car-details/car-details.service';
// =================================== Services ===================================== //

// =================================== Components =================================== //
import { CarDetailsComponent } from './components/car-details/car-details.component';
// =================================== Components =================================== //

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,

    ButtonModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    GrowlModule,
    InputTextModule,
    LightboxModule,
    TabViewModule
  ],
  declarations: [CarDetailsComponent],
  exports: [CarDetailsComponent],
  providers: [HttpService, SharedDataService, CarDetailsService]
})
export class SharedModule { }
