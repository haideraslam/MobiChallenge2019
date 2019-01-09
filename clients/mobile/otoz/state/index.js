export class ApplicationState {
  static userToken = 'userToken';
  
  constructor() {
    this.car = {};
    this.bpId = "0";
    this.balance = "0";
    this.contractTerms = '';
    this.cookieName = 'shared-data';
    this.selfie = '';
    this.selfiePath = '';
    this.document = '';
    this.documentPath = '';
    this.dropOfLocation = '';
    this.startDate = new Date();
    this.endDate = new Date(new Date().setDate(this.startDate.getDate() + 1));
    this.id = '1';
    this.numberOfDays = 1;
    this.pickupLocation = 'Suvarnabhumi Airport';
    this.renter = '';
    this.vehicle = '';
    this.commissionPerDay = 0;
    this.totalCommission = 0;
    this.rentPerDay = 0;
    this.totalRent = 0;
    this.user = {
      profileImage: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
    }
    this.allLocations = [
      { value: 'Don Mueang International Airport' },
      { value: 'Suvarnabhumi Airport' },
      { value: 'Chiang Mai International Airport' },
      { value: 'Mae Fah Luang Chiang Rai International Airport' },
      { value: 'Phuket International Airport' },
      { value: 'Krabi Airport' },
      { value: 'Nakhon Si Thammarat Airport' },
      { value: 'Nan Airport' },
      { value: 'Phitsanulok Airport' }
    ]
  }

}