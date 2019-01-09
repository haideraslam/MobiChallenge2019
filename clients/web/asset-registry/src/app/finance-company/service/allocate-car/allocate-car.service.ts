// =================================== Imports ====================================== //
import { Injectable } from '@angular/core';
import { Routes } from '../../../routes';
// =================================== Imports ====================================== //

// =================================== Services ===================================== //
import { HttpService } from '../../../shared/services/http/http.service';
// =================================== Services ===================================== //

@Injectable()
export class AllocateCarService {

  constructor(private http: HttpService) { }

  getFinanceCompanyCarStock() {
    return this.http.get(Routes.getManufacturerStock);
  }

  getTokenInfo() {
    return Math.floor(Math.random() * Math.floor(100));
  }

  getAllDealers() {
    return this.http.get(Routes.getAllDealers);
  }

  allocateVehicle(obj) {
    return this.http.post(Routes.allocateCarToDealers, obj);
  }
}
