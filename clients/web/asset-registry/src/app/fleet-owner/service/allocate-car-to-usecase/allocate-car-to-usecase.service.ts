// =================================== Imports ====================================== //
import { Injectable } from '@angular/core';
import { Routes } from '../../../routes';
// =================================== Imports ====================================== //

// =================================== Services ===================================== //
import { HttpService } from '../../../shared/services/http/http.service';
// =================================== Services ===================================== //

@Injectable()
export class AllocateCarToUsecaseService {

  constructor(private http: HttpService) { }

  getFleetOwnerCarStock() {
    return this.http.get(Routes.getManufacturerStock);
  }

  getTokenInfo(account: string) {
    return this.http.getWithCredentials(Routes.ACCOUNT_DETAILS + account, true);
  }

  getAllUsecases() {
    return this.http.get(Routes.getAllUsecases);
  }

  allocateVehicle(obj) {
    return this.http.post(Routes.allocateCarToUsecase, obj);
  }

  createAccount(obj) {
    return this.http.post(Routes.CREATE_ACCOUNT, obj);
  }

  createVehicle(obj) {
    return this.http.post(Routes.CREATE_VEHICLE, obj);
  }
}
