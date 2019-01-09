import { Injectable, OnInit } from '@angular/core';

import { HttpService } from 'src/app/shared/services/http/http.service';
import { Routes } from '../../../routes';

@Injectable()
export class TripHistoryService implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {

  }

  getTripsDetail() {
    return this.httpService.getWithCredentials(Routes.GET_TRIPS_INFORMATION, true);
  }

  getVehicleDetail(vin: string) {
    return this.httpService.getWithCredentials(Routes.GET_VEHICLE_DETAILS + vin, true);
  }
}
