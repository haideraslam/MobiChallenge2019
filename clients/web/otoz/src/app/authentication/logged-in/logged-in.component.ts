import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/services/http/http.service';
import { environment } from '../../../environments/environment';
// ================================= Routes ================================= //
import { Routes } from '../../routes';
import { CookiesData } from 'src/app/shared/models/cookie-data';
// ================================= Routes ================================= //

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  cookieValue = 'UNKNOWN';
  cookiesData: CookiesData = new CookiesData();

  constructor(private http: HttpService, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('saved-data');

    this.http.getWithCredentials(Routes.MULTI_USER + Routes.GET_WALLET, true).subscribe((walletsResponse: any) => {
      console.log(walletsResponse.length);
      console.log(walletsResponse);
      if (walletsResponse && walletsResponse.length > 0) {
        if (walletsResponse[0].name === 'manufacturer' || walletsResponse[0].name === 'financeCompany' || walletsResponse[0].name === 'dealer' || walletsResponse[0].name === 'fleetOwner') {
          // adding temporarily for asset registry login
          window.location.href = environment.LOGED_IN_REDIRECT;
        } else {
          // If the user has already signed up, navigate directly to confirm booking view
          this.cookiesData = JSON.parse(this.cookieService.get(this.cookiesData.cookieName));
          this.cookiesData.bpid = walletsResponse[0].name.split('@')[0];
          this.cookieService.set(this.cookiesData.cookieName, JSON.stringify(this.cookiesData));
          this.router.navigate(['/confirm-booking']);
        }
      } else {
        // Sign up the user by giving a random Identity
        const randomNumber = Math.floor((Math.random() * 1000) + 1).toString();

        // Save bpid into cookie
        this.cookiesData = JSON.parse(this.cookieService.get(this.cookiesData.cookieName));
        this.cookiesData.bpid = randomNumber.toString();
        this.cookieService.set(this.cookiesData.cookieName, JSON.stringify(this.cookiesData));

        const renter: any = {
          '$class': 'netsol.innovation.aar.participants.model.CreateRenter',
          'bpId': randomNumber,
          'title': 'title',
          'firstName': 'Renter',
          'lastName': randomNumber,
          'Dob': new Date()
        };

        // Create a new renter participant
        this.http.post(Routes.SINGLE_USER + Routes.CREATE_RENTER, renter).subscribe((renterCreationResponse: any) => {
          const identity = {
            'participant': 'netsol.innovation.aar.participants.model.Renter#' + renterCreationResponse.bpId,
            'userID': renterCreationResponse.bpId,
            'options': {}
          };
          // Create user identity and get a card in response
          this.http.postWithResponseType(Routes.SINGLE_USER + Routes.CREATE_IDENTITY, identity, 'blob').subscribe((identityResponse: any) => {

            const file = new File([identityResponse], 'myCard.card', { type: 'application/octet-stream', lastModified: Date.now() });
            const formData = new FormData();
            formData.append('card', file);

            // Import card into wallet
            this.http.postWithCredentials(Routes.MULTI_USER + Routes.CREATE_IMPORT_CARD, formData, true).subscribe((importCardResponse: any) => {

              // Navigate to Upload Documents (KYC) page
              this.router.navigate(['/upload-document']);
            });
          });
        });
      }
    });
  }
}
