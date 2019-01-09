import { Component, OnInit, Input } from '@angular/core';
import { SharedDataService } from '../../../shared/services/shared-data/shared-data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input()
  selectedMenu = '';

  constructor(private shareData: SharedDataService) {
    this.shareData.userInformation.name = 'Fleet Manager';
    this.shareData.userInformation.imageName = 'logo.png';
  }

  ngOnInit() {
  }

  menuChanged(value: string) {
    this.selectedMenu = value;
  }
}
