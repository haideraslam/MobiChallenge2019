// =================================== Imports ====================================== //
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css'],
  providers: [MessageService]
})
export class ConfirmBookingComponent implements OnInit {

  cookiesData: CookiesData = new CookiesData();
  startDate = new FormControl();
  endDate = new FormControl();

  obj = {
    $class: 'netsol.innovation.aar.contract.model.CreateContract',
    id: '',
    vehicle: '',
    renter: '',
    pickupLocation: '',
    dropoffLocation: '',
    startDate: '',
    endDate: '',
    amount: 0,
    contractTerms: 'The Company shall rent a vehicle (hereinafter referred to as "rental car") to the "renter" in accordance with the provisions of this Agreement (hereinafter referred to as "Agreement") and Detailed Regulations. Matters not prescribed in the "Agreement" and Detailed Regulations shall be handled in accordance with laws and regulations or general customs.'
      + ' The Company may accept special agreements, provided that they do not infringe upon the "Agreement" and Detailed Regulations, laws and regulations and general customs. In case a special agreement is concluded, it shall supersede the "Agreement" and Detailed Regulations.'
  };

  constructor(private http: HttpService,
    private cookieService: CookieService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    this.cookiesData = JSON.parse(this.cookieService.get(this.cookiesData.cookieName));
    this.cookiesData.discount = 0;
    this.cookieService.set(this.cookiesData.cookieName, JSON.stringify(this.cookiesData));

    // getting data from cookie and calculatting the rest of fields that needs to dislplay.
    this.startDate = new FormControl(new Date(this.cookiesData.startDate));
    this.endDate = new FormControl(new Date(this.cookiesData.endDate));
    const timeDiff = Math.abs(new Date(this.cookiesData.endDate).getTime() - new Date(this.cookiesData.startDate).getTime());
    this.cookiesData.numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    this.cookiesData.commissionPerDay = parseInt(this.cookiesData.car.vehicleDetails.rentPerDay, 10) * 25 / 100;
    this.cookiesData.totalCommission = parseInt(this.cookiesData.commissionPerDay.toString(), 10) * parseInt(this.cookiesData.numberOfDays.toString(), 10);
    this.cookiesData.totalRent = parseInt(this.cookiesData.car.vehicleDetails.rentPerDay, 10) * parseInt(this.cookiesData.numberOfDays.toString(), 10);

    // creation of object that we will send with api call when user will confirm the booking.
    this.obj.id = this.cookiesData.id = (Math.floor(Math.random() * 99999) + 1).toString();
    this.obj.vehicle = this.cookiesData.vehicle = `resource:netsol.innovation.aar.vehicle.model.Vehicle#${this.cookiesData.car.vin}`;
    this.http.getWithCredentials(Routes.MULTI_USER + Routes.GET_RENTER, true).subscribe((renterInfo: string) => { this.obj.renter = this.cookiesData.renter = JSON.parse(JSON.stringify(renterInfo)).participant; });
    this.obj.pickupLocation = this.cookiesData.pickupLocation;
    this.obj.dropoffLocation = this.cookiesData.pickupLocation;
    this.obj.startDate = this.cookiesData.startDate.toString();
    this.obj.endDate = this.cookiesData.endDate.toString();
    this.obj.amount = this.cookiesData.totalRent;

    // updating the cookie Data (cookiesData.id is contract id).
    this.cookieService.set(this.cookiesData.cookieName, JSON.stringify(this.cookiesData));

    // Get account details (token and account id)
    this.getAccountDetails();
  }

  getAccountDetails() {
    this.http.get(Routes.MULTI_USER + Routes.GET_ACCOUNT_DETAILS + this.cookiesData.bpid, true).subscribe((response) => {
      const obj = JSON.parse(JSON.stringify(response));
      this.cookiesData.balance = obj.balance;
      this.cookiesData.accountId = obj.address;
      this.cookieService.set(this.cookiesData.cookieName, JSON.stringify(this.cookiesData));
    });
  }

  calculateDiscount() {
    this.http.post(Routes.MULTI_USER + Routes.CALCULATE_DISCOUNT, {
      account: `resource:netsol.innovation.aar.token.model.Account#${this.cookiesData.accountId}`
    }, true).subscribe((response) => {
      const obj = JSON.parse(JSON.stringify(response));
      this.cookiesData.discount = obj.amount;
      this.cookiesData.balance = 0;
      this.cookieService.set(this.cookiesData.cookieName, JSON.stringify(this.cookiesData));
    });
  }

  confirmBooking() {
    console.log(this.obj);
    this.http.post(Routes.MULTI_USER + Routes.CONFIRM_BOOKING,
      this.obj, true).subscribe((response) => {
        const obj = JSON.parse(JSON.stringify(response));
        this.cookiesData.contractId = obj.id;

        if (this.cookiesData.discount > 0) {
          this.http.post(Routes.MULTI_USER + Routes.REDEEM_TOKENS, {
            account: `resource:netsol.innovation.aar.token.model.Account#${this.cookiesData.accountId}`,
            contract: `resource:netsol.innovation.aar.contract.model.Contract#${obj.id}`
          }, true).subscribe((res) => { console.log('REDEEM_TOKENS: Successful:'); });
        }
        this.messageService.add({ severity: 'success', summary: 'Response', detail: 'Booking Confirmed' });
        setTimeout(() => {
          this.router.navigate(['rental-agreement']);
        }, 3000);
      });
  }

  navigateToPickup() {
    this.confirmBooking();
  }
}
