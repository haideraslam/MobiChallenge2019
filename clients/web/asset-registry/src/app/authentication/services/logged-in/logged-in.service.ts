// =================================== Imports ====================================== //
import { Injectable } from '@angular/core';
import { Routes } from '../../../routes';
// =================================== Imports ====================================== //

// =================================== Services ===================================== //
import { HttpService } from '../../../shared/services/http/http.service';
// =================================== Services ===================================== //
@Injectable()
export class LoggedInService {

  constructor(private httpService: HttpService) { }

  // Wallet : Business network cards for the authenticated user
  checkLoginCredentials() {
    return this.httpService.get(Routes.checkLoginCredentials);
  }
}
