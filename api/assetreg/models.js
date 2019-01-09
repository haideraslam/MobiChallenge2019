class Vehicle {
    constructor(vin, owner, currentContract, vehicleDetail, vehicleLocation){
        this.vin = vin;
        this.owner = owner; // e.g.FleetOwner, OEM (Uploader of the cars into Asset Registry)
        this.currentContract = currentContract;
        this.vehicleDetail = vehicleDetail;
        this.vehicleLocation = vehicleLocation;
        this.locked = true;
    }
}
class VehicleDetail {
    constructor(make, model, year, color, variant, transmission, engineType, engineFuel, maximumPower, maximumTorque, engineCc, bodyType, retailPrice, comments, series, featuredImage, images, doors, rentPerDay, fuelType, mileage){

        this.make = make;
        this.model = model;
        this.year = year;
        this.color = color;
        this.variant = variant;
        this.transmission = transmission;
        this.engineType = engineType;
        this.engineFuel = engineFuel;
        this.maximumPower = maximumPower;
        this.maximumTorque = maximumTorque;
        this.engineCc = engineCc;
        this.bodyType = bodyType;
        this.retailPrice = retailPrice;
        this.comments = comments;
        this.series = series;
        this.featuredImage = featuredImage;
        this.images = images;
        this.doors = doors;
        this.rentPerDay = rentPerDay;
        this.fuelType = fuelType;
        this.mileage = mileage;
    }
}
class VehicleLocation {
    constructor(currentCoordinates, currentLocationName){
        this.currentCoordinates = currentCoordinates;
        this.currentLocationName = currentLocationName;
    }
}
class Contract {
    constructor(contractId, owner, renter, contractDetails, ContractStatus, pickupLocation, dropoffLocation, startDate, endDate){
         this.contractId = contractId;
         this.owner = owner;
         this.renter = renter;
         this.contractDetails = contractDetails;
         this.ContractStatus = ContractStatus;
         this.pickupLocation = pickupLocation;
         this.dropoffLocation = dropoffLocation;
         this.startDate = startDate;
         this.endDate = endDate;
    }
}
class BusinessPartner {
    constructor(bpId, title, wallet){
        this.bpId = bpId,
        this.title = title;
        this.wallet = wallet;
    }
}
class Business extends BusinessPartner{
    constructor(bpId, title, address, phone, email){
        super(bpId, title);
        this.address = address;
        this.phone = phone;
        this.email = email;
    }
}
class Person extends BusinessPartner {
    constructor(bpId, title, wallet, firstName, lastName, middleName, gender, dob, kycDetails){
        super(bpId, title, wallet);
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.gender = gender;
        this.dob = dob;
        this.kycDetails = kycDetails;
    }
}
class Wallet {
    constructor(address, balance){
        this.address = address;
        this.balance = balance;
    }
}

class Address {
    constructor(city, country, locality, region, street, street2, street3, postalCode, postOfficeBoxNumber){
    this.city = city;
    this.country = country;
    this.locality = locality;
    this.region = region;
    this.street = street;
    this.street2 = cistreet2ty;
    this.street3 = street3;
    this.postalCode = postalCode;
    this.postOfficeBoxNumber = postOfficeBoxNumber;
    }
  }
class KYCDetails {
    constructor(idDocument, picture){
    this.idDocument = idDocument;
    this.picture = picture;
  }
}
class OEM extends Business {
    constructor(bpId, title, wallet, address, phone, email){
        super(bpId, title, wallet, address, phone, email);
    }
}
class FleetOwner extends Business {
    constructor(bpId, title, wallet, address, phone, email){
        super(bpId, title, wallet, address, phone, email);
    }
}
class Renter extends Person{
    constructor(bpId, title, wallet, firstName, lastName, middleName, gender, dob, kycDetails){
        super(bpId, title, wallet, firstName, lastName, middleName, gender, dob, kycDetails);
    }
}
module.exports = {
    Vehicle : Vehicle,
    VehicleDetail : VehicleDetail,
    VehicleLocation : VehicleLocation,
    Contract : Contract,
    VehicleListing : VehicleListing,
    BusinessPartner : BusinessPartner,
    Business : Business,
    Renter : Renter,
    Person : Person,
    FleetOwner : FleetOwner,
    OEM : OEM,
    Wallet : Wallet,
    KYCDetails : KYCDetails,
    Address : Address
}