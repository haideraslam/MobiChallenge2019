// =================================== Imports ====================================== //
import { Injectable } from '@angular/core';
import { Routes } from '../../../routes';
// =================================== Imports ====================================== //

// =================================== Services ===================================== //
import { HttpService } from '../../../shared/services/http/http.service';
import { Observable } from 'rxjs';
// =================================== Services ===================================== //

@Injectable()
export class CarDetailsService {

  constructor(private http: HttpService) { }

  getCarDetails(vin): Observable<any> {
    return this.http.get(`${Routes.getCarDetails}?vin=${vin}`);
  }

  getInitialCarListForTrackFleetPage(): Observable<any> {
    return this.http.get(`${Routes.GET_CARS_LIST_FOR_TRACK_FLEET}`);
  }
}
