import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  DASHBOARD_PATH: string;

  constructor() { }

  ngOnInit() {
    this.DASHBOARD_PATH = environment.DASHBOARD_PATH;
  }

}
