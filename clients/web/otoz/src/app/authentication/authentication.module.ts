// =================================== Imports ====================================== //
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// =================================== Imports ====================================== //

// =================================== Modules ====================================== //
import { SharedModule } from '../shared/shared.module';
// =================================== Modules ====================================== //

// =================================== Imports - Material =========================== //
import { MatIconModule } from '@angular/material/icon';

// =================================== Imports - Material =========================== //

// =================================== Services ===================================== //
// =================================== Services ===================================== //

// =================================== Components =================================== //
import { LoggedInComponent } from './logged-in/logged-in.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
// =================================== Components =================================== //

import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    SharedModule
  ],
  declarations: [LoggedInComponent, UploadDocumentsComponent],
  providers: [CookieService]
})
export class AuthenticationModule { }
