// =================================== Imports ====================================== //
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// =================================== Imports ====================================== //

// =================================== Services ===================================== //
import { CarDetailsService } from '../../services/car-details/car-details.service';
// =================================== Services ===================================== //

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  car: any = {};
  token: string;
  images: { source: string, title: string }[] = [];

  constructor(private activatedRoute: ActivatedRoute, private carDetailsService: CarDetailsService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.token = params['token'];
      const VIN = params['id'];
      this.carDetailsService.getCarDetails(VIN).subscribe((data) => {
        this.car = data[0].vehicleDetails;
        if (data[0].vehicleDetails.images !== undefined) {
          const listOfImages = Object.values(data[0].vehicleDetails.images);
          listOfImages.forEach(imageName => {
            this.images.push({ source: `assets/image/${imageName}`, title: this.car.model });
          });
        }
      });
    });
  }
}
