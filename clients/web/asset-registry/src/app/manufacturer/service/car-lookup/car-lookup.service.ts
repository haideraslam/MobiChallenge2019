// =================================== Imports ====================================== //
import { Injectable } from '@angular/core';
import { Routes } from '../../../routes';
// =================================== Imports ====================================== //

// =================================== Services ===================================== //
import { HttpService } from '../../../shared/services/http/http.service';
// =================================== Services ===================================== //

@Injectable()
export class CarLookupService {

  constructor(private http: HttpService) { }

  GetManufacturerCarStock() {
    return this.http.get(Routes.getManufacturerStock);
  }

  getTokenInfo() {
    return Math.floor(Math.random() * Math.floor(100));
  }
}
