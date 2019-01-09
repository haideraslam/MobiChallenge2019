// =================================== Imports ====================================== //
import { Component, OnInit} from '@angular/core';
import { Message } from 'primeng/components/common/api';
// =================================== Imports ====================================== //

// =================================== Services ===================================== //
import { AllocateCarService } from '../service/allocate-car/allocate-car.service';
// =================================== Services ===================================== //

@Component({
  selector: 'app-allocate-car',
  templateUrl: './allocate-car.component.html',
  styleUrls: ['./allocate-car.component.css']
})
export class AllocateCarComponent implements OnInit {

  cars: any = [];
  selectedVehicles: string[] = [];

  options: { label: string; value: { $class: string, bpId: string, title: string, account: string }; }[];
  selectedOption: { $class: string, bpId: string, title: string, account: string };

  display = 'none';
  messages: Message[] = [];
  allocateSelectedVisibility = false;

  constructor(private allocateCarService: AllocateCarService) {
    this.options = [
      { label: 'Select a Dealer', value: null }
    ];
  }

  ngOnInit() {
    this.allocateCarService.getFinanceCompanyCarStock().subscribe((data) => { this.cars = data; });
    this.allocateCarService.getAllDealers().subscribe((data) => {
      const dealers = Object.values(data);
      dealers.forEach(element => {
        this.options.push({
          label: element.title,
          value: element
        });
      });
    });
    this.allocateSelectedVisibility = true;
  }

  getTokenInfo() {
    return this.allocateCarService.getTokenInfo();
  }

  showPopup() { this.display = 'block'; }

  closePopup() { this.display = 'none'; }

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
    const bpid = this.selectedOption.bpId;
    this.selectedVehicles.forEach(vin => {
      const obj = {
        '$class': 'netsol.innovation.aar.vehicle.lease.AllocateCarToDealer',
        'vehicle': `resource:netsol.innovation.aar.vehicle.model.Vehicle#${vin}`,
        'dealer': `resource:netsol.innovation.aar.participants.model.Dealer#${bpid}`
      };
      this.allocateCarService.allocateVehicle(obj).subscribe((x) => { });
    });
    this.closePopup();
    this.reset();
    this.showSuccess();
  }

  showSuccess() {
    this.clear();
    this.messages.push({ severity: 'success', summary: 'Success!!!', detail: 'Car(s) Allocated.' });
  }

  clear() {
    this.messages = [];
  }

  reset() {
    this.selectedVehicles = [];
  }

}
