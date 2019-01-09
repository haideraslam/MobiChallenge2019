import { VehicleDetails } from './vehicle-details';
import { VehicleLocation } from './vehicle-location';

export class Vehicle {
  '$class' = '';
  vin = '';
  vehicleDetails: VehicleDetails = new VehicleDetails();
  currentLeaseDeal = '';
  account = '';
  oem = '';
  fleetOwner = '';
  currentContract = '';
  vehicleLocation: VehicleLocation = new VehicleLocation();
  locked = true;
  usecase = '';
}
