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
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
// =================================== Imports - Prime NG =========================== //

// =================================== Modules ====================================== //
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ApplicationLayoutModule } from './application-layout/application-layout.module';
import { AuthenticationModule } from './authentication/authentication.module';
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

    AppRoutingModule,
    ApplicationLayoutModule,
    SharedModule,
    AuthenticationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
