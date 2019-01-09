// =================================== Imports ====================================== //
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// =================================== Imports ====================================== //

// =================================== Services ===================================== //
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
// =================================== Services ===================================== //

// =================================== Class ======================================== //
import { CookiesData } from '../../models/cookie-data';
// =================================== Class ======================================== //

@Component({
  selector: 'app-search-bar-top',
  templateUrl: './search-bar-top.component.html',
  styleUrls: ['./search-bar-top.component.css'],
  providers: [MessageService]
})
export class SearchBarTopComponent implements OnInit {
  cookiesData: CookiesData = new CookiesData();
  startDate = new FormControl();
  endDate = new FormControl();

  constructor(private cookieService: CookieService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.cookiesData = JSON.parse(this.cookieService.get(this.cookiesData.cookieName));
    this.startDate = new FormControl(new Date(this.cookiesData.startDate));
    this.endDate = new FormControl(new Date(this.cookiesData.endDate));
  }

  searchCars() {
    let isValid = true;

    if (!this.cookiesData.pickupLocation) {
      this.messageService.add({ severity: 'info', summary: 'Pick-up Location', detail: 'Please select pick-up location.' });
      isValid = false;
    }

    if (new Date(this.startDate.value).getDate() < new Date().getDate()) {
      this.messageService.add({ severity: 'info', summary: 'Date', detail: 'Please select valid dates.' });
      isValid = false;
    }

    if (new Date(this.startDate.value).getDate() >= new Date(this.endDate.value).getDate()) {
      this.messageService.add({ severity: 'info', summary: 'Date', detail: 'Please select valid dates.' });
      isValid = false;
    }

    if (isValid) {
      this.cookiesData.startDate = this.startDate.value;
      this.cookiesData.endDate = this.endDate.value;
      this.cookieService.set(this.cookiesData.cookieName, JSON.stringify(this.cookiesData));
      this.router.navigate(['/car-list']);
    }

  }
}
