import { Vehicle } from './vehicle';
import { TripSummary } from './trip-summary';

export class Trip {
  '$class' = '';
  contractId = '';
  vehicle = '';
  vehicleData: Vehicle = new Vehicle();
  fleetOwner = '';
  renter = '';
  amount = 0;
  contractStatus = '';
  pickupLocation = '';
  dropoffLocation = '';
  startDate = '';
  endDate = '';
  tripSummary = new TripSummary();
}
