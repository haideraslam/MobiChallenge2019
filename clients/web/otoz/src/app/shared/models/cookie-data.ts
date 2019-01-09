export class CookiesData {
  constructor() {
    this.accountId = '';
    this.balance = 0;
    this.bpid = '';
    this.car = {};
    this.commissionPerDay = 0;
    this.contractTerms = '';
    this.cookieName = 'shared-data';
    this.discount = 0;
    this.dropOfLocation = '';
    this.id = '1';
    this.numberOfDays = 0;
    this.pickupLocation = '';
    this.renter = '';
    this.startDate = new Date();
    this.endDate = new Date(new Date().setDate(this.startDate.getDate() + 1));
    this.totalCommission = 0;
    this.totalRent = 0;
    this.vehicle = '';
    this.contractId = '';
  }
  accountId: string;
  balance: number;
  bpid: string;
  car: any;
  commissionPerDay: number;
  contractTerms: string;
  cookieName: string;
  discount: number;
  dropOfLocation: string;
  id: string;
  numberOfDays: number;
  pickupLocation: string;
  renter: string;
  startDate: Date;
  endDate: Date;
  totalCommission: number;
  totalRent: number;
  vehicle: string;
  contractId: string;
}
