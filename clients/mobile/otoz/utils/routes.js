export class Routes {
    static IS_SINGLE_USER_SERVER_IN_USE = true;
    static SINGLE_USER = 'http://aarvm2.westeurope.cloudapp.azure.com:3001/';
    static MULTI_USER  = 'http://aarvm2.westeurope.cloudapp.azure.com:3000/';
    static BASE_SERVER = Routes.IS_SINGLE_USER_SERVER_IN_USE ? Routes.SINGLE_USER : Routes.MULTI_USER;
    static GET_CARS_LIST = Routes.BASE_SERVER + 'api/netsol.innovation.aar.vehicle.model.GetAvailableVehicles';
    static AUTH_GOOGLE = Routes.MULTI_USER + 'auth/google';
    // static AUTH_GOOGLE = 'http://www.google.com';
    static CREATE_RENTER_FRONT_END = Routes.BASE_SERVER + 'api/netsol.innovation.aar.participants.model.CreateRenter';
    static GET_RENTER = Routes.BASE_SERVER + 'api/system/ping';
    static UPLOAD_KYC = Routes.BASE_SERVER + 'api/netsol.innovation.aar.participants.model.UploadKyc';
    static GET_ACCOUNT_DETAILS = Routes.BASE_SERVER + 'api/netsol.innovation.aar.token.model.Account/';
    static CALCULATE_DISCOUNT = Routes.BASE_SERVER + 'api/netsol.innovation.aar.token.model.CalculateDiscount';
    static REDEEM_TOKENS = Routes.BASE_SERVER + 'api/netsol.innovation.aar.token.model.RedeemTokens';
    static CONFIRM_BOOKING = Routes.BASE_SERVER + 'api/netsol.innovation.aar.contract.model.CreateContract';
    static PICKUP_CAR = Routes.BASE_SERVER + 'api/netsol.innovation.aar.contract.model.PickupCar';
    static DROP_OFF_CAR = Routes.BASE_SERVER + 'api/netsol.innovation.aar.contract.model.DropoffCar';
    // static CREATE_RENTER = Routes.BASE_SERVER + 'api/netsol.innovation.aar.participants.model.RENTER';
    // static CREATE_IDENTITY = Routes.BASE_SERVER + 'api/system/identities/issue';
    // static CREATE_IMPORT_CARD = Routes.BASE_SERVER + 'api/wallet/import';
    // static GET_WALLET = Routes.BASE_SERVER + 'api/wallet';
    // static GET_CONTRACT_INFO = Routes.BASE_SERVER + 'api/netsol.innovation.aar.contract.model.Contract/';
  }