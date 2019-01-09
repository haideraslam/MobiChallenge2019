// =================================== Imports ====================================== //
import { Component, OnInit } from '@angular/core';
// =================================== Imports ====================================== //

// =================================== Services ===================================== //
import { CarLookupService } from '../service/car-lookup/car-lookup.service';
// =================================== Services ===================================== //

@Component({
  selector: 'app-car-lookup',
  templateUrl: './car-lookup.component.html',
  styleUrls: ['./car-lookup.component.css']
})
export class CarLookupComponent implements OnInit {

  cars: any = [];

  constructor(private carLookupService: CarLookupService) { }

  ngOnInit() {
    this.carLookupService.GetManufacturerCarStock().subscribe((data => { this.cars = data; }));
  }

  getTokenInfo() {
    return this.carLookupService.getTokenInfo();
  }
}
