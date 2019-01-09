// =================================== Imports ====================================== //
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SafePipe } from './safe.pipe';
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
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ApplicationLayoutModule } from './application-layout/application-layout.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { FinanceCompanyModule } from './finance-company/finance-company.module';
import { FleetOwnerModule } from './fleet-owner/fleet-owner.module';
// =================================== Modules ====================================== //

// =================================== Services ===================================== //
// =================================== Services ===================================== //

// =================================== Components =================================== //
import { AppComponent } from './app.component';
// =================================== Components =================================== //

@NgModule({
  declarations: [AppComponent],
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
    TabViewModule,
    TooltipModule,

    AuthenticationModule,
    AppRoutingModule,
    ApplicationLayoutModule,
    SharedModule,
    ManufacturerModule,
    FinanceCompanyModule,
    FleetOwnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
