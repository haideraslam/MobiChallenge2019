// =================================== Imports ====================================== //
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
// =================================== Imports ====================================== //

// =================================== Services ===================================== //
import { AllocateCarToUsecaseService } from '../../service';
// =================================== Services ===================================== //

// =================================== Models ======================================= //
import { CarsListForAllocation } from '../../models/car-list-for-allocation';
import { AccountDetails } from '../../models/account-details';
// =================================== Models ======================================= //

@Component({
  selector: 'app-allocate-car',
  templateUrl: './allocate-car-to-usecase.component.html',
  styleUrls: ['./allocate-car-to-usecase.component.css']
})
export class AllocateCarToUsecaseComponent implements OnInit {
  file: any;

  cars: CarsListForAllocation[] = [];
  selectedVehicles: string[] = [];

  options: {
    label: string;
    value: { $class: string; name: string; description: string };
  }[];
  selectedOption: { $class: string; name: string; description: string };

  display = 'none';
  messages: Message[] = [];
  allocateSelectedVisibility = false;

  constructor(
    private allocateCarToUsecaseService: AllocateCarToUsecaseService
  ) {
    this.options = [{ label: 'Select a Usecase', value: null }];
  }

  ngOnInit() {
    this.allocateCarToUsecaseService.getFleetOwnerCarStock().subscribe(data => {
      const cars = data as CarsListForAllocation[];
      cars.forEach(c => {
        this.allocateCarToUsecaseService.getTokenInfo(c.account.split('#')[1]).subscribe(response => {
          const account = response as AccountDetails;
          c.balance = account.balance;
        });
      });
      this.cars = cars;
    });
    this.allocateCarToUsecaseService.getAllUsecases().subscribe(data => {
      const usecases = Object.values(data);
      usecases.forEach(element => {
        this.options.push({
          label: element.description,
          value: element
        });
      });
    });
    this.allocateSelectedVisibility = true;
  }

  showPopup() {
    this.display = 'block';
  }

  closePopup() {
    this.display = 'none';
  }

  allocateClicked() {
    this.showPopup();
  }

  selectVehicle(vehicleId) {
    const index = this.selectedVehicles.indexOf(vehicleId);
    if (index === -1) {
      this.selectedVehicles.push(vehicleId);
    }
    this.showPopup();
  }

  allocateVehicle() {
    const usecaseName = this.selectedOption.name;
    this.selectedVehicles.forEach(vin => {
      const obj = {
        $class: 'netsol.innovation.aar.usecase.model.AllocateCarToUsecase',
        vehicle: `resource:netsol.innovation.aar.vehicle.model.Vehicle#${vin}`,
        usecase: `resource:netsol.innovation.aar.usecase.model.Usecase#${usecaseName}`
      };
      this.allocateCarToUsecaseService.allocateVehicle(obj).subscribe(x => { });
    });
    this.closePopup();
    this.reset();
    this.showSuccess();
  }

  showSuccess() {
    this.clear();
    this.messages.push({
      severity: 'success',
      summary: 'Success!!!',
      detail: 'Car(s) Allocated.'
    });
  }

  clear() {
    this.messages = [];
  }

  reset() {
    this.selectedVehicles = [];
  }

  fileChanged(e) {
    this.file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      JSON.parse(fileReader.result.toString()).forEach((element) => {
        const obj = {
          '$class': 'netsol.innovation.aar.token.model.Account',
          'address': `${element.VIN_nbr}`,
          'balance': 1000
        };
        this.createAccount(obj, element);
      });
      this.clear();
      this.messages.push({
        severity: 'success',
        summary: 'Success!!!',
        detail: `${JSON.parse(fileReader.result.toString()).length} Car(s) added.`
      });
    };

    fileReader.readAsText(this.file);
  }

  async createAccount(obj, element) {
    const _images = [];
    for (let i = 1; i <= 3; i++) {
      _images.push(element.asset_make_dsc + '_' + element.asset_model_dsc + '_' + element.color_dsc + '-' + i + element.image_format);
    }
    return this.allocateCarToUsecaseService.createAccount(obj).subscribe((res) => {
      const _obj = {
        '$class': 'netsol.innovation.aar.vehicle.model.Vehicle',
        'vin': `${element.VIN_nbr}`,
        'vehicleDetails': {
          '$class': 'netsol.innovation.aar.vehicle.model.VehicleDetails',
          'colour': `${element.color_dsc}`,
          'comments': `${element.comments}`,
          'doors': `${element.doors}`,
          'featuredImage': `${element.image_name}`,
          'fuel': `${element.fuel}`,
          'fuelType': `${element.fuel_type}`,
          'images': _images,
          'make': `${element.asset_make_dsc}`,
          'mileage': `${element.mileage}`,
          'model': `${element.asset_model_dsc}`,
          'numberOfSeats': `${element.seats}`,
          'rentPerDay': `${element.rent_per_day}`,
          'retailPrice': `${element.retail_price_amt}`,
          'seats': `${element.seats}`,
          'transmission': `${element.transmission}`,
          'variant': `${element.model_variant_typ}`,
          'year': `${element.year}`,
        },
        'account': `resource:netsol.innovation.aar.token.model.Account#${element.VIN_nbr}`,
        'oem': 'resource:netsol.innovation.aar.participants.model.Manufacturer#MF1',
        'fleetOwner': 'resource:netsol.innovation.aar.participants.model.FleetOwner#FO1',
        'locked': true
      };
      this.allocateCarToUsecaseService.createVehicle(_obj).subscribe((response) => { });
    });
  }

}
