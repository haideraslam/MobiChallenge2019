// =================================== Imports ====================================== //
import { Component, OnInit } from '@angular/core';
// =================================== Imports ====================================== //

// =================================== Services ===================================== //
import { ApplicationQueueService } from '../service/application-queue/application-queue.service';
// =================================== Services ===================================== //

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  cars: any = [];

  constructor(private applicationQueueService: ApplicationQueueService) { }

  ngOnInit() {
    this.applicationQueueService.getFinanceCompanyCarStock().subscribe((data => { this.cars = data; }));
  }

  getTokenInfo() {
    return this.applicationQueueService.getTokenInfo();
  }
}
