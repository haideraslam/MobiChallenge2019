import { Component, OnInit, Input } from '@angular/core';
import { SharedDataService } from '../../shared/services/shared-data/shared-data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  name: string;
  imageName: string;

  constructor(private shareUserData: SharedDataService) { }

  ngOnInit() {
    this.name = this.shareUserData.userInformation.name;
    this.imageName = this.shareUserData.userInformation.imageName;
  }

}
