import { environment } from '../environments/environment';
export class Routes {
  public static SINGLE_USER = environment.SINGLE_USER || 'http://aarvm2.westeurope.cloudapp.azure.com:3001/';
  public static MULTI_USER  = environment.MULTI_USER || 'http://aarvm2.westeurope.cloudapp.azure.com:3000/';
  public static GET_CARS_LIST = 'api/netsol.innovation.aar.vehicle.model.GetAvailableVehicles';
  public static AUTH_GOOGLE = 'auth/google';
  public static UPLOAD_KYC = 'api/netsol.innovation.aar.participants.model.UploadKyc';
  public static CREATE_RENTER = 'api/netsol.innovation.aar.participants.model.CreateRenter';
  public static CREATE_IDENTITY = 'api/system/identities/issue';
  public static CREATE_IMPORT_CARD = 'api/wallet/import';
  public static GET_WALLET = 'api/wallet';
  public static GET_RENTER = 'api/system/ping';
  public static CONFIRM_BOOKING = 'api/netsol.innovation.aar.contract.model.CreateContract';
  public static GET_CONTRACT_INFO = 'api/netsol.innovation.aar.contract.model.Contract/';
  public static PICKUP_CAR = 'api/netsol.innovation.aar.contract.model.PickupCar';
  public static DROP_OFF_CAR = 'api/netsol.innovation.aar.contract.model.DropoffCar';
  public static GET_ACCOUNT_DETAILS = 'api/netsol.innovation.aar.token.model.Account/';
  public static CALCULATE_DISCOUNT = 'api/netsol.innovation.aar.token.model.CalculateDiscount';
  public static REDEEM_TOKENS = 'api/netsol.innovation.aar.token.model.RedeemTokens';
  public static RENTER_DETAILS = 'api/netsol.innovation.aar.participants.model.Renter/';
  public static GET_CAR_INFORMATION = 'api/netsol.innovation.aar.vehicle.model.Vehicle/';
}
