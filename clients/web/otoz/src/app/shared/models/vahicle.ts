import { VehicleDetails } from './vehicle-details';
import { VehicleLocation } from './vehicle-location';

export class Vahicle {
    '$class' = '';
    vin = '';
    vehicleDetails: VehicleDetails = new VehicleDetails();
    currentLeaseDeal = '';
    account = '';
    oem = '';
    fleetOwner = '';
    vehicleLocation: VehicleLocation = new VehicleLocation();
    locked = true;
    usecase = '';
}
