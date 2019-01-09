import { environment } from '../environments/environment';
export class Routes {
  public static baseAddress = environment.baseAddressMultiUser || 'http://aarvm2.westeurope.cloudapp.azure.com:3000/';
  public static baseAddressLoadJsonData = environment.baseAddressSingleUser || 'http://aarvm2.westeurope.cloudapp.azure.com:3001/';
  public static checkLoginCredentials = Routes.baseAddress + 'api/wallet';
  public static getManufacturerStock = Routes.baseAddress + 'api/netsol.innovation.aar.vehicle.model.Vehicle';
  public static getTokenInfo = Routes.baseAddress + 'api/netsol.innovation.aar.vehicle.model.Vehicle';
  public static getCarDetails = Routes.baseAddress + 'api/queries/GetVehicleInfo';
  public static getAllDealers = Routes.baseAddress + 'api/netsol.innovation.aar.participants.model.Dealer';
  public static getAllUsecases = Routes.baseAddress + 'api/netsol.innovation.aar.usecase.model.Usecase';
  public static allocateCarToDealers = Routes.baseAddress + 'api/netsol.innovation.aar.vehicle.lease.AllocateCarToDealer';
  public static allocateCarToUsecase = Routes.baseAddress + 'api/netsol.innovation.aar.usecase.model.AllocateCarToUsecase';
  public static CREATE_ACCOUNT = Routes.baseAddressLoadJsonData + 'api/netsol.innovation.aar.token.model.Account';
  public static CREATE_VEHICLE = Routes.baseAddressLoadJsonData + 'api/netsol.innovation.aar.vehicle.model.Vehicle';
  public static GET_CARS_LIST_FOR_TRACK_FLEET = Routes.baseAddress + 'api/netsol.innovation.aar.vehicle.model.Vehicle';
  public static CREATE_FLEET_OWNER = 'api/netsol.innovation.aar.participants.model.CreateFleetOwner';
  public static GET_WALLET = 'api/wallet';
  public static CREATE_IDENTITY = 'api/system/identities/issue';
  public static CREATE_IMPORT_CARD = 'api/wallet/import';
  public static FLEET_OWNER_DETAILS = Routes.baseAddress + 'api/netsol.innovation.aar.participants.model.FleetOwner/';
  public static ACCOUNT_DETAILS = Routes.baseAddress + 'api/netsol.innovation.aar.token.model.Account/';
  public static GET_TRIPS_INFORMATION = Routes.baseAddress + 'api/netsol.innovation.aar.contract.model.Contract';
  public static GET_VEHICLE_DETAILS = Routes.baseAddress + 'api/netsol.innovation.aar.vehicle.model.Vehicle/';
  public static GET_CONTRACT_INFO = Routes.baseAddress + 'api/netsol.innovation.aar.contract.model.Contract/';
  public static GET_CAR_INFORMATION = Routes.baseAddress + 'api/netsol.innovation.aar.vehicle.model.Vehicle/';
}
