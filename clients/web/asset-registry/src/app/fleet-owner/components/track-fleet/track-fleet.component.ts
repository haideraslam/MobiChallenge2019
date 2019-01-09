import { Component, OnInit } from '@angular/core';
import { CarDetailsService } from 'src/app/shared/services/car-details/car-details.service';
import { environment } from '../../../../environments/environment';
import { FleetOwnerWalletService } from '../../service';
import angleBetweenPoints from 'angle-between-points';

declare var google;

@Component({
  selector: 'app-track-fleet',
  templateUrl: './track-fleet.component.html',
  styleUrls: ['./track-fleet.component.css']
})
export class TrackFleetComponent implements OnInit {

  imagePath = `
    M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759
    c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z
    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713
    v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.682l2.218-3.336
    h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805
  `;

  // google maps zoom level
  zoom = 16;

  // initial center position for the map
  lat = 56.459751;
  lon = -2.977653;
  isSetFirstTime = false;

  markers: Marker[] = [];

  i = 0;
  index = 0;
  deltaLat;
  deltalon;

  constructor(
    private carDetailsService: CarDetailsService,
    private fleetOwnerWalletService: FleetOwnerWalletService
  ) {
    const ws = new WebSocket(environment.webSocket);
    ws.onopen = () => { console.log('Successfully connect WebSocket'); };
    ws.onmessage = message => {
      const obj = JSON.parse(message.data);
      // if (!obj.time || !obj.lat) {
      //   return;
      // }
      if (this.markers.length === 0) {
        this.markers.push({
          contractId: obj.contractId,
          fuelConsumptionRate: obj.fuelConsumptionRate,
          lat: obj.lat,
          lon: obj.lon,
          milage: obj.milage,
          noOfHardBreaks: obj.noOfHardBreaks,
          speed: obj.speed,
          status: obj.status,
          time: obj.time,
          vin: obj.vin,
          label: obj.label,
          icon: {
            path: this.imagePath,
            scale: 0.6,
            rotation: 0,
            fillColor: '#427af4',
            fillOpacity: 1,
            strokeWeight: 1,
            anchor: new google.maps.Point(0, 5)
          },
          draggable: false
        });
        this.lat = obj.lat;
        this.lon = obj.lon;
        const current = { lat: obj.lat, lon: obj.lon };
        const index = 0;
        this.transition(this.markers[index], index, current);
        this.getCarDetails(obj.vin);
      } else {
        const index = this.markers.findIndex(x => x.vin === obj.vin);
        if (index !== -1) {
          this.markers[index].fuelConsumptionRate = obj.fuelConsumptionRate;
          this.markers[index].milage = obj.milage;
          this.markers[index].noOfHardBreaks = obj.noOfHardBreaks;
          this.markers[index].speed = obj.speed;
          this.markers[index].status = obj.status;
          this.markers[index].time = obj.time;
          const current = { lat: obj.lat, lon: obj.lon };
          this.transition(this.markers[index], index, current);
          this.getCarDetails(obj.vin);
        } else {
          this.markers.push({
            contractId: obj.contractId,
            fuelConsumptionRate: obj.fuelConsumptionRate,
            lat: obj.lat,
            lon: obj.lon,
            milage: obj.milage,
            noOfHardBreaks: obj.noOfHardBreaks,
            speed: obj.speed,
            status: obj.status,
            time: obj.time,
            vin: obj.vin,
            label: obj.label,
            icon: {
              path: this.imagePath,
              scale: 0.6,
              rotation: 0,
              fillColor: '#427af4',
              fillOpacity: 1,
              strokeWeight: 1,
              anchor: new google.maps.Point(0, 5)
            },
            draggable: false
          });
          this.getCarDetails(obj.vin);
        }
      }
    };
  }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.carDetailsService.getInitialCarListForTrackFleetPage().subscribe((response) => {
      const data = JSON.parse(JSON.stringify(response));
      data.forEach(obj => {
        this.fleetOwnerWalletService.getFleetOwnerAccountDetails(obj.account.split('#')[1]).subscribe(x => {
          this.markers.push({
            contractId: obj.vin,
            balance: x.balance,
            fuelConsumptionRate: 0,
            lat: obj.vehicleLocation.currentCoordinates.split(',')[0],
            lon: obj.vehicleLocation.currentCoordinates.split(',')[1],
            milage: 0,
            noOfHardBreaks: 0,
            speed: 0,
            status: 'Stop',
            time: '',
            vin: obj.vin,
            make: obj.vehicleDetails.make,
            model: obj.vehicleDetails.model,
            featuredImage: obj.vehicleDetails.featuredImage,
            label: obj.vehicleDetails.model,
            icon: {
              path: this.imagePath,
              scale: 0.6,
              rotation: 0,
              fillColor: '#427af4',
              fillOpacity: 1,
              strokeWeight: 1,
              anchor: new google.maps.Point(0, 5)
            },
            draggable: false
          });
        });
      });
    });
  }

  getCarDetails(vin) {
    const index = this.markers.findIndex(x => x.vin === vin);
    if (!this.markers[index].isDataCalled) {
      this.carDetailsService.getCarDetails(vin).subscribe((car) => {
        this.markers[index].make = car[0].vehicleDetails.make;
        this.markers[index].model = car[0].vehicleDetails.model;
        this.markers[index].featuredImage = car[0].vehicleDetails.featuredImage;
        this.markers[index].isDataCalled = true;
      });
    }
  }

  transition(previous, index, current) {

    this.i = 0;
    const deltaLat = (parseFloat(current.lat) - parseFloat(previous.lat)) / 100;
    const deltalon = (parseFloat(current.lon) - parseFloat(previous.lon)) / 100;

    // this.markers[index].icon.style = `rotate(${this.calculateAngle(previous, current)}deg)`;
    this.moveMarker(previous, index, deltaLat, deltalon);
    this.calculateAngle(previous, current);
  }

  moveMarker(previous?, index?, deltaLat?, deltalon?) {
    previous.lat += parseFloat(deltaLat);
    previous.lon += parseFloat(deltalon);
    this.markers[index].lat = parseFloat(previous.lat);
    this.markers[index].lon = parseFloat(previous.lon);
    if (this.i !== 100) {
      this.i++;
      setTimeout(() => { this.moveMarker(previous, index, deltaLat, deltalon); }, 10);
    }
  }

  calculateAngle = (previous: Marker, current: { lat: number, lon: number }) => {
    const index = this.markers.findIndex(x => x.vin === previous.vin);
    // console.log(index + '  ' + angleBetweenPoints({ x: previous.lat, y: previous.lon }, { x: current.lat, y: current.lon }));
    this.markers[index] = Object.assign({}, this.markers[index]);
    this.markers[index].icon.rotation = angleBetweenPoints({ x: previous.lat, y: previous.lon }, { x: current.lat, y: current.lon });
  }
}

// just an interface for type safety.
class Marker {
  make?: string;
  model?: string;
  balance?: string;
  featuredImage?: string;
  contractId: string;
  fuelConsumptionRate: number;
  lat: number;
  lon: number;
  milage: number;
  noOfHardBreaks: number;
  speed: number;
  status: string;
  time: string;
  vin: string;
  label?: string;
  style?: string;
  icon?: {
    path: string,
    scale: number,
    rotation: number,
    fillColor: string,
    fillOpacity: number,
    strokeWeight: number,
    anchor: any
  };
  draggable: boolean;
  // tslint:disable-next-line:no-inferrable-types
  isDataCalled?: boolean = false;
}
