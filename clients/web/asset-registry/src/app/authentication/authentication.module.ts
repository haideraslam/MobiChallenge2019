// =================================== Imports ====================================== //
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// =================================== Imports ====================================== //

// =================================== Modules ====================================== //
import { SharedModule } from '../shared/shared.module';
// =================================== Modules ====================================== //

// =================================== Services ===================================== //
import { LoginService } from './services/login/login.service';
import { LoggedInService } from './services/logged-in/logged-in.service';
// =================================== Services ===================================== //

// =================================== Components =================================== //
import { LoginComponent } from './login/login.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
// =================================== Components =================================== //

import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    SharedModule
  ],
  declarations: [LoginComponent, LoggedInComponent],
  exports: [LoginComponent, LoggedInComponent],
  providers: [LoginService, LoggedInService, CookieService]
})

export class AuthenticationModule { }
