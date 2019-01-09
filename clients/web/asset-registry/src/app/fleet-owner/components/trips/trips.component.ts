import { Component, OnInit } from '@angular/core';
import { TripHistoryService } from '../../service';
import { Vehicle, Trip } from '../../models';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  data: Trip[] = [];

  constructor(private tripHistoryService: TripHistoryService) { }

  ngOnInit() {
    this.getTripsInformation();
  }

  getTripsInformation() {
    this.tripHistoryService.getTripsDetail().subscribe((response) => {
      this.data = response as Trip[];
      this.data.forEach(e => {
        this.tripHistoryService.getVehicleDetail(e.vehicle.split('#')[1]).subscribe((data) => { e.vehicleData = data as Vehicle; });
      });
    });
  }

}
