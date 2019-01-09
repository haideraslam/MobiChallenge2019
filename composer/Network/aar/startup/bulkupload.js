const client = require('composer-client');
const fs = require('fs');
const path = require("path");
const usecaseNamespace = 'netsol.innovation.aar.usecase.model';
const vehicleNamespace = 'netsol.innovation.aar.vehicle.model';

// Read assets details from JSON file
const rawdata = fs.readFileSync(path.resolve(__dirname, "assets.json"));
let assets = JSON.parse(rawdata);  
console.log(assets);  
console.log('==============================================');
console.log('Bulk Upload Started');
console.log('==============================================');

async function uploadAssets(params) {
    const bnc = new client.BusinessNetworkConnection();
    await bnc.connect('admin@aar');

    const factory = bnc.getBusinessNetwork().getFactory();

    // Get Vehicle Asset Registry
    let vehicleRegistry = await bnc.getAssetRegistry('netsol.innovation.aar.vehicle.model.Vehicle');
    let accountRegistry = await bnc.getAssetRegistry('netsol.innovation.aar.token.model.Account');
    let leaseDealRegistry = await bnc.getAssetRegistry('netsol.innovation.aar.vehicle.lease.VehicleLeaseDeal');
    let useCaseRegistry = await bnc.getAssetRegistry('netsol.innovation.aar.usecase.model.Usecase');
  
    let assignToCarRental = true;
    let assetsToImport = assets.length;

    if(process.argv.length > 2){ // 3rd Argument should be 'true' or 'false' to assign assets to OTOZ or not
        assignToCarRental = process.argv[2];
    }

    if(process.argv.length > 3){ // 4th argument would be an integer to tell how many assets should be added to the ledger
        assetsToImport = process.argv[3];
    }

    let useCases = await useCaseRegistry.getAll();
    if(!(useCases && useCases.length > 0)){
        // Adding Usecases
        let carRentalUsecase = factory.newResource(usecaseNamespace,'Usecase','Car-Rental');
        carRentalUsecase.description = 'Car Rental';
        console.log('Adding car-rental Usecase to Ledger');
        await useCaseRegistry.add(carRentalUsecase);
        console.log('Usecase Added');

        let rentalWithDriverUsecase = factory.newResource(usecaseNamespace,'Usecase','Car-Rental-with-Driver');
        rentalWithDriverUsecase.description = 'Car Rental with Driver';
        console.log('Adding rent-with-driver Usecase to Ledger');
        await useCaseRegistry.add(rentalWithDriverUsecase);
        console.log('Usecase Added');

        let monthlyRentalUsecase = factory.newResource(usecaseNamespace,'Usecase','Monthly-Rental');
        monthlyRentalUsecase.description = 'Monthly Rental';
        console.log('Adding monthly-rental Usecase to Ledger');
        await useCaseRegistry.add(monthlyRentalUsecase);
        console.log('Usecase Added');
    }
    // Loop through assets json object and push them to ledger
    for(let i = 0; i < assetsToImport; i++){
        try{
        let leaseDealId = assets[i].VIN_nbr; // setting VIN as Deal ID
        let accountAddress = assets[i].VIN_nbr; // setting VIN as Account Address
 
        let newAccount = factory.newResource('netsol.innovation.aar.token.model','Account',accountAddress);
        newAccount.balance = 500;
        newAccount.cashBalance = 0;
        
        console.log('Adding Account to ledger');
        await accountRegistry.add(newAccount);
        console.log('Account added Successfully');
        console.log('==============================================');

        let newVehicle = factory.newResource('netsol.innovation.aar.vehicle.model','Vehicle',assets[i].VIN_nbr);

        // Associate vehicle with Account and Manufacturer
        newVehicle.account = factory.newRelationship('netsol.innovation.aar.token.model', 'Account', newAccount.address);
        newVehicle.oem = factory.newRelationship('netsol.innovation.aar.participants.model', 'Manufacturer', 'MF1');
        newVehicle.fleetOwner = factory.newRelationship('netsol.innovation.aar.participants.model', 'FleetOwner', 'FO1');
        newVehicle.locked = true;

        let vehicleLocation = factory.newConcept(vehicleNamespace,'VehicleLocation');

        if(assets[i].coordinates){
            vehicleLocation.currentCoordinates  = assets[i].coordinates;
        }
        else{
            vehicleLocation.currentCoordinates  = '56.4600439,-2.979843';
        }

        vehicleLocation.currentLocationName  = 'West Marketgait, Dundee, Scotland';
        newVehicle.vehicleLocation = vehicleLocation;
        
        // Assign vehicle to OTOZ
        if(assignToCarRental){
            newVehicle.usecase = factory.newRelationship(usecaseNamespace, 'Usecase', 'Car-Rental');
        }
        let vehicleDetails = factory.newConcept('netsol.innovation.aar.vehicle.model','VehicleDetails');
        
        vehicleDetails.make = assets[i].asset_make_dsc.toString();
        vehicleDetails.model = assets[i].asset_model_dsc.toString();
        vehicleDetails.transmission = assets[i].transmission.toString();
        vehicleDetails.retailPrice = assets[i].retail_price_amt;
        vehicleDetails.comments = assets[i].comments.toString();
        vehicleDetails.series = assets[i].vehicle_series_dsc.toString();
        vehicleDetails.colour = assets[i].color_dsc.toString();
        vehicleDetails.featuredImage = assets[i].image_name.toString();
        vehicleDetails.seats = assets[i].seats;
        vehicleDetails.doors = assets[i].doors;
        vehicleDetails.rentPerDay = assets[i].rent_per_day;
        vehicleDetails.year = assets[i].year;
        vehicleDetails.fuelType = assets[i].fuel_type;
        vehicleDetails.fuel = assets[i].fuel;
        vehicleDetails.mileage = assets[i].mileage;
        
        // Add vehicle images (naming convenstion make_model_colour.png)
        vehicleDetails.images = [];
        for(let i=1; i<=3; i++){
            vehicleDetails.images.push(vehicleDetails.make + "_" + vehicleDetails.model + "_" + vehicleDetails.colour + "-" + i + assets[i].image_format);
        }

        newVehicle.vehicleDetails = vehicleDetails;

        console.log('Adding Vehicle to ledger');
        await vehicleRegistry.add(newVehicle);
        console.log('Vehicle added Successfully');
        console.log('==============================================');

        let newLeaseDeal = factory.newResource('netsol.innovation.aar.vehicle.lease','VehicleLeaseDeal',leaseDealId);
        
        newLeaseDeal.vehicle = factory.newRelationship('netsol.innovation.aar.vehicle.model', 'Vehicle', assets[i].VIN_nbr);
        newLeaseDeal.financeCompany = factory.newRelationship('netsol.innovation.aar.participants.model', 'FinanceCompany', 'FC1');
        newLeaseDeal.status = 'OEM_TO_FC_ALLOCATED';
        
        console.log('Adding Lease Deal to ledger');
        await leaseDealRegistry.add(newLeaseDeal);
        console.log('Lease Deal Added Successfully');
        console.log('==============================================');

        // Associate Vehicle with Lease Deal
        newVehicle.currentLeaseDeal = factory.newRelationship('netsol.innovation.aar.vehicle.lease', 'VehicleLeaseDeal', leaseDealId);
        
        console.log('Associating Lease Deal with Vehicle');
        await vehicleRegistry.update(newVehicle);
        console.log('Lease Deal Associated Successfully');
        console.log('==============================================');
    }
    catch(ex){
        // In case an entity is not inserted do not stop, continue with next item
    }
    }
    
    // Retrieve and display all vehicles
    result = await vehicleRegistry.getAll();
    console.log(result);
    console.log('Bulk Upload Completed');
    process.exit();
}
uploadAssets(client);

