// =================================== Imports ====================================== //
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
// =================================== Imports ====================================== //

// =================================== Services ===================================== //
import { CookieService } from 'ngx-cookie-service';
import { Routes } from '../../../routes';
import { HttpService } from '../../services/http/http.service';
import { MessageService } from 'primeng/api';
// =================================== Services ===================================== //

// =================================== Class ======================================== //
import { CookiesData } from '../../models/cookie-data';
// =================================== Class ======================================== //

declare let L: any;
declare let WrldIndoorControl: any;
@Component({
  selector: 'app-rental-agreement',
  templateUrl: './rental-agreement.component.html',
  styleUrls: ['./rental-agreement.component.css'],
  providers: [MessageService]
})
export class RentalAgreementComponent implements OnInit {

  cookiesData: CookiesData = new CookiesData();
  startDate = new FormControl();
  endDate = new FormControl();

  URL = '';

  obj = {
    $class: '',
    contractId: '',
    contractStatus: 'PENDING_PICKUP',
    dropoffLocation: '',
    endDate: '',
    fleetOwner: '',
    pickupLocation: '',
    renter: '',
    startDate: '',
    vehicle: ''
  };

  constructor(
    private http: HttpService,
    private cookieService: CookieService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    this.cookiesData = JSON.parse(this.cookieService.get(this.cookiesData.cookieName));
    this.startDate = new FormControl(new Date(this.cookiesData.startDate));
    this.endDate = new FormControl(new Date(this.cookiesData.endDate));
    this.getContractInformation();
  }

  getContractInformation() {
    this.http.get(Routes.MULTI_USER + Routes.GET_CONTRACT_INFO + this.cookiesData.id, true).subscribe((response) => {
      this.obj = JSON.parse(JSON.stringify(response));
      if (this.obj.contractStatus === 'PENDING_PICKUP') {
        this.URL = environment.PICK_UP_PATH;
      } else if (this.obj.contractStatus === 'PICKED_UP') {
        this.URL = environment.DROP_OFF_PATH;
      }
    });
  }

  pickupClicked() {
    const obj = {
      $class: 'netsol.innovation.aar.contract.model.PickupCar',
      contract: `resource:netsol.innovation.aar.contract.model.Contract#${this.obj.contractId}`
    };

    this.http.post(Routes.MULTI_USER + Routes.PICKUP_CAR, obj, true).subscribe((response) => {
      this.getContractInformation();
      this.messageService.add({ severity: 'success', summary: 'Response', detail: 'Car Unlocked.' });
    });
  }

  dropOffClicked() {
    const obj = {
      $class: 'netsol.innovation.aar.contract.model.DropoffCar',
      contract: `resource:netsol.innovation.aar.contract.model.Contract#${this.obj.contractId}`
    };

    this.http.post(Routes.MULTI_USER + Routes.DROP_OFF_CAR, obj, true).subscribe((response) => {
      this.getContractInformation();
      this.messageService.add({ severity: 'success', summary: 'Response', detail: 'Drop off successfully done.' });
      setTimeout(() => {
        this.router.navigate(['wallet']);
      }, 4000);
    });
  }

}
