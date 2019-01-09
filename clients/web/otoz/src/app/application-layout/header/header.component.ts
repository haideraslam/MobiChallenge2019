import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookiesData } from 'src/app/shared/models/cookie-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cookiesData: CookiesData = new CookiesData();

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.cookiesData = JSON.parse(this.cookieService.get(this.cookiesData.cookieName));
    console.log(this.cookiesData);
  }

}
