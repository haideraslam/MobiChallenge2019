// =================================== Imports ====================================== //
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
// =================================== Imports ====================================== //

// =================================== Services ===================================== //
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
// =================================== Services ===================================== //

// =================================== Class ======================================== //
import { CookiesData } from '../../models/cookie-data';
// =================================== Class ======================================== //

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  cookiesData: CookiesData = new CookiesData();
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());
  constructor(private router: Router, private cookieService: CookieService, private messageService: MessageService) { }

  ngOnInit() {
    if (this.cookieService.get(this.cookiesData.cookieName) !== '') {
      const data = JSON.parse(this.cookieService.get(this.cookiesData.cookieName));
      this.cookiesData.bpid = data.bpid;
      this.cookieService.set(this.cookiesData.cookieName, JSON.stringify(this.cookiesData));
    }
    console.log(this.cookiesData);
    this.startDate = new FormControl(this.cookiesData.startDate);
    this.endDate = new FormControl(this.cookiesData.endDate);
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
      this.cookiesData.balance = 0;
      this.cookiesData.discount = 0;
      this.cookieService.set(this.cookiesData.cookieName, JSON.stringify(this.cookiesData));
      this.router.navigate(['/car-list']);
    }

  }

  searchCarsWithDrivers() {
    this.searchCars();
  }
}
