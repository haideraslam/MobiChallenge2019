import { Injectable, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Routes } from 'src/app/routes';

@Injectable()
export class FleetOwnerWalletService {

  constructor(private httpService: HttpService) { }

  getFleetOwnerDetails(id: string): Observable<any> {
    return this.httpService.getWithCredentials(Routes.FLEET_OWNER_DETAILS + id, true);
  }

  getFleetOwnerAccountDetails(id: string): Observable<any> {
    return this.httpService.getWithCredentials(Routes.ACCOUNT_DETAILS + id, true);
  }
}
