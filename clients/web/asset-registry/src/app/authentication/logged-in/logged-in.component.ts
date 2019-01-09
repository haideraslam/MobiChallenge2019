import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/services/http/http.service';
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

  constructor(private http: HttpService, private cookieService: CookieService, private router: Router) {
    this.cookieService.set(this.cookiesData.cookieName, JSON.stringify(this.cookiesData));
  }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('fo-saved-data');

    this.http.getWithCredentials(Routes.baseAddress + Routes.GET_WALLET, true).subscribe((walletsResponse: any) => {
      if (walletsResponse && walletsResponse.length > 0) {
        // If the user has already signed up, navigate directly to confirm booking view

        this.cookiesData = JSON.parse(this.cookieService.get(this.cookiesData.cookieName));
        this.cookiesData.bpid = walletsResponse[0].name.split('@')[0];
        this.cookieService.set(this.cookiesData.cookieName, JSON.stringify(this.cookiesData));

        this.router.navigate(['/fleet-owner']);
      } else {
        // Sign up the user by giving a random Identity
        const randomNumber = Math.floor((Math.random() * 1000) + 1).toString();

        // Save bpid into cookie
        this.cookiesData = JSON.parse(this.cookieService.get(this.cookiesData.cookieName));
        this.cookiesData.bpid = randomNumber.toString();
        this.cookieService.set(this.cookiesData.cookieName, JSON.stringify(this.cookiesData));

        const fleetOwner: any = {
          '$class': 'netsol.innovation.aar.participants.model.CreateFleetOwner',
          'bpId': randomNumber,
          'title': 'Fleet Owner ' + randomNumber,
        };

        // Create a new fleet owner participant
        this.http.post(Routes.baseAddressLoadJsonData + Routes.CREATE_FLEET_OWNER, fleetOwner).subscribe((fleetOwnerCreationResponse: any) => {
          const identity = {
            'participant': 'netsol.innovation.aar.participants.model.FleetOwner#' + fleetOwnerCreationResponse.bpId,
            'userID': fleetOwnerCreationResponse.bpId,
            'options': {}
          };
          // Create user identity and get a card in response
          this.http.postWithResponseType(Routes.baseAddressLoadJsonData + Routes.CREATE_IDENTITY, identity, 'blob').subscribe((identityResponse: any) => {

            const file = new File([identityResponse], 'myCard.card', { type: 'application/octet-stream', lastModified: Date.now() });
            const formData = new FormData();
            formData.append('card', file);

            // Import card into wallet
            this.http.postWithCredentials(Routes.baseAddress + Routes.CREATE_IMPORT_CARD, formData, true).subscribe((importCardResponse: any) => {

              // Navigate to Fleet Owner page
              this.router.navigate(['/fleet-owner']);
            });
          });
        });
      }
    });
  }
}
