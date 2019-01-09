import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../shared/services/shared-data/shared-data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private shareData: SharedDataService) {
    this.shareData.userInformation.name = 'Fleet Manager';
    this.shareData.userInformation.imageName = 'logo.png';
  }

  ngOnInit() {
  }

}
