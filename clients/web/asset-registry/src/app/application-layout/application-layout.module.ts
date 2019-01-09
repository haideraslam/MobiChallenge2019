// =================================== Imports ====================================== //
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// =================================== Imports ====================================== //

// =================================== Imports - Prime NG =========================== //
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
// =================================== Imports - Prime NG =========================== //

// =================================== Components =================================== //
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
// =================================== Components =================================== //

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,

    ButtonModule,
    DropdownModule
  ],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, MenuComponent],
  exports: [LayoutComponent]
})
export class ApplicationLayoutModule { }
