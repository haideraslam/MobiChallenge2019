import { VehicleDetails } from './vehicle-details';
import { VehicleLocation } from './vehicle-location';

export interface CarsListForAllocation {
    $class: string;
    account: string;
    currentLeaseDeal: string;
    fleetOwner: string;
    locked: boolean;
    oem: string;
    usecase: string;
    vehicleDetails: VehicleDetails;
    vehicleLocation: VehicleLocation;
    vin: string;
    balance: number;
}
