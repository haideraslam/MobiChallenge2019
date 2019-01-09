// =================================== Imports ====================================== //
import { Component, OnInit } from '@angular/core';
// =================================== Imports ====================================== //

// =================================== Services ===================================== //
import { CookieService } from 'ngx-cookie-service';
import { Routes } from '../../../routes';
import { HttpService } from '../../services/http/http.service';
// =================================== Services ===================================== //

// =================================== Class ======================================== //
import { CookiesData } from '../../models/cookie-data';
// =================================== Class ======================================== //

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cookiesData: CookiesData = new CookiesData();
  cars: any = [];

  constructor(private http: HttpService, private cookieService: CookieService) { }

  ngOnInit() {

    this.cookiesData = JSON.parse(this.cookieService.get(this.cookiesData.cookieName));

    this.http.post(Routes.SINGLE_USER + Routes.GET_CARS_LIST, {}).subscribe((cars) => {
      this.cars = cars;
      console.log(cars);
    });
  }

  bookNowClicked(car) {
    this.cookiesData.car = car;
    this.cookieService.set(this.cookiesData.cookieName, JSON.stringify(this.cookiesData));
    window.open(Routes.MULTI_USER + Routes.AUTH_GOOGLE, '_self');
  }

}
