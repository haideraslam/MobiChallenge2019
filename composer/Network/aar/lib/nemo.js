'use strict';

const tokenNamespace = 'netsol.innovation.aar.token.model';
const contractNamespace = 'netsol.innovation.aar.contract.model';
const vehicleModelNamespace = 'netsol.innovation.aar.vehicle.model';
const participantsNamespace = 'netsol.innovation.aar.participants.model';

//TokenTransfer
/**
 * Transfer tokens from one account to another
 * @param {netsol.innovation.aar.token.model.TokenTransfer} tokenTransfer - the tokenTransfer transaction
 * @transaction
 */
async function tokenTransfer(tokenTransferRequest)
{
    const factory = getFactory();
  
    if(tokenTransferRequest.fromAccount.balance >= tokenTransferRequest.amount)
    {
        tokenTransferRequest.fromAccount.balance = tokenTransferRequest.fromAccount.balance - tokenTransferRequest.amount;
        tokenTransferRequest.toAccount.balance = tokenTransferRequest.toAccount.balance + tokenTransferRequest.amount;
        let tokenRegistry = await getAssetRegistry(tokenNamespace + '.Account');
        await tokenRegistry.update(tokenTransferRequest.fromAccount);
        await tokenRegistry.update(tokenTransferRequest.toAccount);
        
        
        // Fire the event for demo
        let tokenTransferEvent = factory.newEvent('netsol.innovation.aar.token.model', 'TokenTransferEvent');
        emit(tokenTransferEvent);
    }
    else
    {
        throw new Error('There is not enough balance in account: ' + tokenTransferRequest.fromAccount.address);
    }
}

//UploadKyc
/**
 * Transfer tokens from one account to another
 * @param {netsol.innovation.aar.participants.model.UploadKyc} uploadKyc - the UploadKyc transaction
 * @transaction
 */
async function uploadKyc(request)
{
    const factory = getFactory();

    request.renter.kycDetails = request.kycDetails;
    let reg = await getParticipantRegistry('netsol.innovation.aar.participants.model.Renter');
    console.log('reg:' + reg)
    await reg.update(request.renter);

    let kycUploadedEvent = factory.newEvent('netsol.innovation.aar.participants.model', 'KycUploadedEvent');
    emit(kycUploadedEvent);
}

//CreateRenter
/**
 * Add new Renter
 * @param {netsol.innovation.aar.participants.model.CreateRenter} createRenter - the CreateRenter transaction
 * @transaction
 */
async function createRenter(request)
{
    const factory = getFactory();

    // Get Account Asset Registry    
    let accountRegistry = await getAssetRegistry(tokenNamespace + '.Account');
    let accountAddress = request.bpId; // setting bpId as Account Address
    let renterAccount = factory.newResource(tokenNamespace,'Account',accountAddress);
    let renterTokenReward = 1000;
    let renterDeposit = 1000;

    renterAccount.balance = renterTokenReward;
    renterAccount.cashBalance = renterDeposit; // Depositing default amount to Renter Wallet while on-boarding
    
    renterAccount.transactionHistory = [];

    // Update Transaction History
    let tokenRewardTransaction  = factory.newConcept(tokenNamespace, 'TransactionHistory')

    tokenRewardTransaction.type = 'Earn';
    tokenRewardTransaction.category = 'Token';
    tokenRewardTransaction.amount = renterTokenReward;
    tokenRewardTransaction.reason = 'OnBoarding';
    tokenRewardTransaction.timeStamp = new Date();
    tokenRewardTransaction.comments = 'On-boarding token reward'

    renterAccount.transactionHistory.push(tokenRewardTransaction);

    // Update Transaction History
    let cashDepositTransaction  = factory.newConcept(tokenNamespace, 'TransactionHistory')

    cashDepositTransaction.type = 'Credit';
    cashDepositTransaction.category = 'Cash';
    cashDepositTransaction.amount = renterDeposit;
    cashDepositTransaction.reason = 'CashDeposit';
    cashDepositTransaction.timeStamp = new Date();
    cashDepositTransaction.comments = 'Cash Deposit By Renter'

    renterAccount.transactionHistory.push(cashDepositTransaction);
    
    // Update Renter Account with new transactions
    accountRegistry.update(renterAccount);

    let tokenTransferToRenterEvent = factory.newEvent(tokenNamespace, 'TokenTransferToRenterEvent');
    emit(tokenTransferToRenterEvent);

    await accountRegistry.add(renterAccount);

    let tokensAllocatedEvent = factory.newEvent(tokenNamespace, 'TokensAllocated');
    emit(tokensAllocatedEvent);

    // Get Renter Asset Registry
    let renterRegistry = await getParticipantRegistry(participantsNamespace + '.Renter');
  
    let newRenter = factory.newResource(participantsNamespace,'Renter',request.bpId);
    newRenter.firstName = request.firstName;
    newRenter.lastName = request.lastName;
    newRenter.Dob = request.Dob;
    newRenter.title = request.title;
    newRenter.account = factory.newRelationship(tokenNamespace, 'Account', renterAccount.address);
  
    await renterRegistry.add(newRenter);

    let signedUpEvent = factory.newEvent(participantsNamespace, 'RenterSignedUp');
    emit(signedUpEvent);
}

//CreateFleetOwner
/**
 * Add new Fleet Owner
 * @param {netsol.innovation.aar.participants.model.CreateFleetOwner} createFleetOwner - the CreateFleetOwner transaction
 * @transaction
 */
async function createFleetOwner(request)
{
    const factory = getFactory();

    // Get Account Asset Registry    
    let accountRegistry = await getAssetRegistry(tokenNamespace + '.Account');
    let accountAddress = request.bpId; // setting bpId as Account Address
    let fleetOwnerAccount = factory.newResource(tokenNamespace,'Account',accountAddress);
    let fleetOwnerTokenReward = 1000;

    fleetOwnerAccount.balance = fleetOwnerTokenReward;
    fleetOwnerAccount.cashBalance = 0;
    
    fleetOwnerAccount.transactionHistory = [];

    // Update Transaction History
    let transactionHistoryItem  = factory.newConcept(tokenNamespace, 'TransactionHistory')

    transactionHistoryItem.type = 'Earn';
    transactionHistoryItem.category = 'Token';
    transactionHistoryItem.amount = fleetOwnerTokenReward;
    transactionHistoryItem.reason = 'OnBoarding';
    transactionHistoryItem.timeStamp = new Date();
    transactionHistoryItem.comments = 'On-boarding token reward'

    fleetOwnerAccount.transactionHistory.push(transactionHistoryItem);
    
    // Update Fleet Owner Account with new transaction history item
    accountRegistry.update(fleetOwnerAccount);

    let tokenTransferToFleetOwnerEvent = factory.newEvent(tokenNamespace, 'TokenTransferToFleetOwnerEvent');
    emit(tokenTransferToFleetOwnerEvent);

    await accountRegistry.add(fleetOwnerAccount);

    let tokensAllocatedEvent = factory.newEvent(tokenNamespace, 'TokensAllocated');
    emit(tokensAllocatedEvent);

    // Get FleetOwner Asset Registry
    let fleetOwnerRegistry = await getParticipantRegistry(participantsNamespace + '.FleetOwner');
  
    let newFleetOwner = factory.newResource(participantsNamespace,'FleetOwner',request.bpId);
    newFleetOwner.title = request.title;
    newFleetOwner.account = factory.newRelationship(tokenNamespace, 'Account', fleetOwnerAccount.address);
  
    await fleetOwnerRegistry.add(newFleetOwner);

    let signedUpEvent = factory.newEvent(participantsNamespace, 'FleetOwnerSignedUp');
    emit(signedUpEvent);

    // Temp Fix - Assign All Vehicles to new signed up Fleet Owner
    let vehicleRegistry = await getAssetRegistry(vehicleNamespace+'.Vehicle');
    let vehicles = await vehicleRegistry.getAll();
   
    vehicles.forEach(function(vehicle){
        vehicle.fleetOwner = factory.newRelationship(participantsNamespace, 'FleetOwner', request.bpId);
        vehicleRegistry.update(vehicle);
    });

    // // Simulated Vehicles Auto-Start
    // const simulatedVehicles = ["WP0ZZZ99ZJS167006", "WP0ZZZ99ZJS167007", "WP0ZZZ99ZJS167008", "WP0ZZZ99ZJS167009", "WP0ZZZ99ZJS167010" ]
    
    // simulatedVehicles.forEach(function(simVehicle, index){
   
    //     let carUnlockedEvent = factory.newEvent(contractNamespace, 'CarUnlock');
    //     carUnlockedEvent.contractId = "simulatedContract#" + index;
    //     carUnlockedEvent.vin = simVehicle;
    //     emit(carUnlockedEvent);
    // });
}

//CalculateDiscount
/**
 * Calculate Discount Based On Token Balance
 * @param {netsol.innovation.aar.token.model.CalculateDiscount} calculateDiscount - the CalculateDiscount transaction
 * @returns {netsol.innovation.aar.token.model.Discount} Amount to be discounted 
 * @transaction
 */
async function calculateDiscount(request)
{
    const factory = getFactory();

    // Get Account Asset Registry    
    let accountRegistry = await getAssetRegistry(tokenNamespace + '.Account');
    let account = await accountRegistry.get(request.account.getIdentifier());
    
    console.log("Account Info: " + account);

    let discountAmount = account.balance/100; // 100:1 is the tokens:currency ratio 

    console.log("Discount Amount: " + discountAmount);

    let discountCalulatedEvent = factory.newEvent(tokenNamespace, 'DiscountCalulated');
    emit(discountCalulatedEvent);

    let discount = factory.newConcept(tokenNamespace, 'Discount')
    discount.amount = discountAmount;
    return discount;
}

//RedeemTokens
/**
 * Redeem tokens
 * @param {netsol.innovation.aar.token.model.RedeemTokens} redeemTokens - the RedeemTokens transaction
 * @transaction
 */
async function redeemTokens(request)
{
    const factory = getFactory();

    // Get Account Asset Registry    
    let accountRegistry = await getAssetRegistry(tokenNamespace + '.Account');
    let account = await accountRegistry.get(request.account.getIdentifier());

    if(!account.transactionHistory){
        account.transactionHistory = [];
    }
    
    let transactionHistoryItem  = factory.newConcept(tokenNamespace, 'TransactionHistory')

    transactionHistoryItem.type = 'Burn';
    transactionHistoryItem.category = 'Token';
    transactionHistoryItem.amount = account.balance;
    transactionHistoryItem.reason = 'DiscountAvailed';
    transactionHistoryItem.timeStamp = new Date();
    transactionHistoryItem.comments = 'Tokens redeemed, discount awarded'

    if(request.contract){
        // Get Contract Asset Registry    
        let contractRegistry = await getAssetRegistry(contractNamespace + '.Contract');
        let contract = await contractRegistry.get(request.contract.getIdentifier());
        transactionHistoryItem.contract = contract;
    }

    account.transactionHistory.push(transactionHistoryItem);
    account.balance = 0; // Removing all tokens from the account

    let tokensRedemptionEvent = factory.newEvent(tokenNamespace, 'TokensRedeemed');
    emit(tokensRedemptionEvent);

    await accountRegistry.update(account);
}

//CreateContract
/**
 * Create Car rental contract
 * @param {netsol.innovation.aar.contract.model.CreateContract} createContract - the CreateContract transaction
 * @transaction
 */
async function createContract(request)
{
    const factory = getFactory();
    
    let renterRegistry = await getParticipantRegistry(participantsNamespace + '.Renter');
    let renter = await renterRegistry.get(request.renter.getIdentifier());

    let vehicleRegistry = await getAssetRegistry('netsol.innovation.aar.vehicle.model.Vehicle');
    let vehicle = await vehicleRegistry.get(request.vehicle.getIdentifier());

    let fleetOwnerRegistry = await getParticipantRegistry(participantsNamespace + '.FleetOwner');
    let fleetOwner = await fleetOwnerRegistry.get(vehicle.fleetOwner.getIdentifier());

    let accountRegistry = await getAssetRegistry(tokenNamespace + '.Account');
    let renterAccount = await accountRegistry.get(renter.account.getIdentifier());

    if(renterAccount.cashBalance >= request.amount){
        
        // Create contract logic
        let contractRegistry = await getAssetRegistry('netsol.innovation.aar.contract.model.Contract');
        
        let newContract = factory.newResource(contractNamespace,'Contract',request.id);
        newContract.pickupLocation = request.pickupLocation;
        newContract.dropoffLocation = request.dropoffLocation;
        newContract.amount = request.amount;
        newContract.startDate = request.startDate;
        newContract.endDate = request.endDate;
        newContract.vehicle = request.vehicle;
        newContract.renter = request.renter;
        newContract.fleetOwner = request.vehicle.fleetOwner;
        newContract.contractStatus = 'PENDING_PICKUP';

        await contractRegistry.add(newContract);

        let contract = factory.newRelationship(contractNamespace, 'Contract', request.id);

        // Trip Payment Deduction from Renter's Account
        let debitTransactionHistoryItem  = factory.newConcept(tokenNamespace, 'TransactionHistory')

        debitTransactionHistoryItem.type = 'Debit';
        debitTransactionHistoryItem.category = 'Cash';
        debitTransactionHistoryItem.amount = request.amount;
        debitTransactionHistoryItem.reason = 'ContractAmount';
        debitTransactionHistoryItem.timeStamp = new Date();
        debitTransactionHistoryItem.contract = contract;
        debitTransactionHistoryItem.comments = 'Amount debited for trip payment'

        renterAccount.cashBalance -= request.amount;

        renterAccount.transactionHistory.push(debitTransactionHistoryItem);

        // Trip Payment Credit into Fleet Owner's Account
        let creditTransactionHistoryItem  = factory.newConcept(tokenNamespace, 'TransactionHistory')

        creditTransactionHistoryItem.type = 'Credit';
        creditTransactionHistoryItem.category = 'Cash';
        creditTransactionHistoryItem.amount = request.amount;
        creditTransactionHistoryItem.reason = 'ContractAmount';
        creditTransactionHistoryItem.timeStamp = new Date();
        creditTransactionHistoryItem.contract = contract;
        creditTransactionHistoryItem.comments = 'Amount credited for trip payment'

        let fleetOwnerAccount = await accountRegistry.get(fleetOwner.account.getIdentifier());

        fleetOwnerAccount.cashBalance += request.amount;

        fleetOwnerAccount.transactionHistory.push(creditTransactionHistoryItem);

        await accountRegistry.update(renterAccount); // Renter Account Debited
        await accountRegistry.update(fleetOwnerAccount); // FO account Credited

        // Update Vehicle with current contract
        vehicle.currentContract = factory.newRelationship(contractNamespace, 'Contract', request.id);
        await vehicleRegistry.update(vehicle);

        let paymentSuccessEvent = factory.newEvent(tokenNamespace, 'PaymentSuccessful');
        emit(paymentSuccessEvent);

        let signedEvent = factory.newEvent(contractNamespace, 'ContractSigned');
        emit(signedEvent);

        let createContractEvent = factory.newEvent(contractNamespace, 'ContractCreated');
        emit(createContractEvent);
    }
    else{
        // Throw an error as the there is not enough amount in renter's wallet
        throw new Error('Not Enough Amount in the wallet to create contract');
    }
}

//PickupCar
/**
 * Pick up a car
 * @param {netsol.innovation.aar.contract.model.PickupCar} pickupCar - the PickupCar transaction
 * @transaction
 */
async function pickupCar(request) {

     const factory = getFactory();

     const contract = request.contract;
     contract.contractStatus = 'PICKED_UP';
     let contractRegistry = await getAssetRegistry(contractNamespace+'.Contract');
     await contractRegistry.update(contract);

     let carUnlockedEvent = factory.newEvent(contractNamespace, 'CarUnlock');
     carUnlockedEvent.contractId = contract.contractId;
     carUnlockedEvent.vin = contract.vehicle.vin;
     emit(carUnlockedEvent);
}

//DropoffCar
/**
 * Drop off a car
 * @param {netsol.innovation.aar.contract.model.DropoffCar} dropoffCar - the DropoffCar transaction
 * @transaction
 */
async function dropoffCar(request) {

    const factory = getFactory();

    const contract = request.contract;
    contract.contractStatus = 'DROPPED_OFF';
    let contractRegistry = await getAssetRegistry(contractNamespace+'.Contract');
    await contractRegistry.update(contract);

    let carLockedEvent = factory.newEvent(contractNamespace, 'CarLock');
    carLockedEvent.contractId = contract.contractId;
    carLockedEvent.vin = contract.vehicle.vin;
    emit(carLockedEvent);

    // Remove Current Contract from Vehicle to make it available for next rides
    let vehicleRegistry = await getAssetRegistry(vehicleNamespace + '.Vehicle');
    let vehicle = await vehicleRegistry.get(request.contract.vehicle.getIdentifier());

    delete vehicle.currentContract;
    await vehicleRegistry.update(vehicle);
    
    let storeDropoffLocationEvent = factory.newEvent(contractNamespace, 'StoreDropoffLocation');
    emit(storeDropoffLocationEvent);

    let notifyInsurerEvent = factory.newEvent(contractNamespace, 'NotifyInsurer');
    emit(notifyInsurerEvent);

    let notifyOwnerEvent = factory.newEvent(contractNamespace, 'NotifyOwner');
    emit(notifyOwnerEvent);
}

//GetAllContracts
/**
 * Get All Contracts of Fleet Owner
 * @param {netsol.innovation.aar.contract.model.GetAllContracts} getAllContracts - the GetAllContracts (readonly) transaction
 * @returns {netsol.innovation.aar.contract.model.Contract[]} All Contracts of the fleet Owner.
 * @transaction
 */
async function getAllContracts(request) {

    let contractRegistry = await getAssetRegistry(contractNamespace+'.Contract');
    let contracts = await contractRegistry.getAll();
   
    let fleetOwnerContracts = [];
    contracts.forEach(function(contract){
        if(contract.fleetOwner == request.fleetOwner){
            fleetOwnerContracts.push(contract);
        }
    });
    return fleetOwnerContracts;
}


//GetAvailableVehicles
/**
 * Get All Vehicles that are available to be rented out
 * @param {netsol.innovation.aar.vehicle.model.GetAvailableVehicles} getAvailableVehicles - the GetAvailableVehicles (readonly) transaction
 * @returns {netsol.innovation.aar.vehicle.model.Vehicle[]} All Vehicles available to be rented out.
 * @transaction
 */
async function getAvailableVehicles(getAvailableVehicles) {

    let vehicleRegistry = await getAssetRegistry(vehicleNamespace+'.Vehicle');
    let vehicles = await vehicleRegistry.getAll();
   
    let availableVehicles = [];
    vehicles.forEach(function(vehicle){
        if(!vehicle.currentContract && vehicle.usecase){
        availableVehicles.push(vehicle);
        }
    });
    return availableVehicles;
}

//GetBookedVehicles
/**
 * Get All Vehicles that are booked by renter
 * @param {netsol.innovation.aar.vehicle.model.GetBookedVehicles} getBookedVehicles - the GetAvailableVehicles (readonly) transaction
 * @returns {netsol.innovation.aar.vehicle.model.Vehicle[]} All Vehicles available to be rented out.
 * @transaction
 */
async function getBookedVehicles(getBookedVehicles) {

    // Get the current participant.
    var currentParticipant = getCurrentParticipant();
    // Check to see if the current participant is a Renter.
    if (currentParticipant.getFullyQualifiedType() !== 'netsol.innovation.aar.participants.model.Renter') {
    // Throw an error as the current participant is not a Renter.
    throw new Error('Current participant is not a Renter');
    }

    let participantId = currentParticipant.getFullyQualifiedIdentifier();

    let vehicleRegistry = await getAssetRegistry(vehicleModelNamespace+'.Vehicle');
    let vehicles = await vehicleRegistry.getAll();
    let bookedVehicles = [];
    vehicles.forEach(function(vehicle){
        if(vehicle.currentContract && vehicle.vehicleDetails.make == 'BMW'){ // TODO: need to check renter id && vehicle.currentContract.renter.getFullyQualifiedIdentifier() == participantId){
            bookedVehicles.push(vehicle);
        }
    });
   
    return bookedVehicles;
}
//UpdateTripSummary [TODO:Haider - Refactor into smaller functions]
/**
 * Update Trip Summary
 * @param {netsol.innovation.aar.contract.model.UpdateTripSummary} updateTripSummary - the UpdateTripSummary transaction
 * @transaction
 */
async function updateTripSummary(request)
{
    const factory = getFactory();
    
    // Get Account Registry
    let accountRegistry = await getAssetRegistry(tokenNamespace + '.Account');

    // Get Contract Registry
    let contractRegistry = await getAssetRegistry(contractNamespace + '.Contract');

    let contract = await contractRegistry.get(request.contract.getIdentifier());

    let tripSummary = factory.newConcept(contractNamespace, 'TripSummary');

    tripSummary.averageSpeed = request.averageSpeed; 
    tripSummary.noOfHardBrakes = request.noOfHardBrakes; 
    tripSummary.duration = request.duration; 
    tripSummary.tolls = request.tolls;
    tripSummary.tirePressure = request.tirePressure; 
    tripSummary.fuelConsumption = request.fuelConsumption; 
    tripSummary.mileage = request.mileage; 
    tripSummary.collisionCount = request.collisionCount; 
    tripSummary.dropOffCoordinates = request.dropOffCoordinates; 

    // Get Average Speed Rating
    let averageSpeedRating = 0;

    if(request.averageSpeed <= 60){
        averageSpeedRating = 5;
    }
    else if(request.averageSpeed <= 80){
        averageSpeedRating = 4;
    }
    else if(request.averageSpeed <= 100){
        averageSpeedRating = 3;
    }
    else if(request.averageSpeed <= 120){
        averageSpeedRating = 2;
    }
    else {
        averageSpeedRating = 1;
    }

    // Get No. Of Hard Brakes Rating
    let hardBrakesRating = 0;

    if(request.noOfHardBrakes <= 1){
        hardBrakesRating = 5;
    }
    else if(request.noOfHardBrakes <= 3){
        hardBrakesRating = 4;
    }
    else if(request.noOfHardBrakes <= 5){
        hardBrakesRating = 3;
    }
    else if(request.noOfHardBrakes <= 7){
        hardBrakesRating = 2;
    }
    else {
        hardBrakesRating = 1;
    }

    let ratingsDataPoints = 2;
    let totalRating = (averageSpeedRating + hardBrakesRating)/ratingsDataPoints;

    tripSummary.rating = totalRating;

    contract.tripSummary = tripSummary;

    // update trip summary
    await contractRegistry.update(contract);

    let tripSummaryEvent = factory.newEvent(contractNamespace, 'TripSummaryUpdated');
    emit(tripSummaryEvent);

    // Transfer tokens to Renter based on Driver's Behavior/Trip Rating

    let renterTokenReward = 0;
    if(tripSummary.rating >= 5){
        renterTokenReward = 100; 
    }
    else if(tripSummary.rating >= 4){
        renterTokenReward = 50; 
    }
    else if(tripSummary.rating >= 3){
        renterTokenReward = 10; 
    }

    if(renterTokenReward != 0){
        // Get Renter Registry
        let renterRegistry = await getParticipantRegistry(participantsNamespace + '.Renter');
        // Get Renter
        let renter = await renterRegistry.get(contract.renter.getIdentifier());

         // Get Renter's account/wallet
        let renterAccount = await accountRegistry.get(renter.account.getIdentifier());

        if(!renterAccount.transactionHistory){
            renterAccount.transactionHistory = [];
        }

        let transactionHistoryItem  = factory.newConcept(tokenNamespace, 'TransactionHistory')

        transactionHistoryItem.type = 'Earn';
        transactionHistoryItem.category = 'Token';
        transactionHistoryItem.amount = renterTokenReward;
        transactionHistoryItem.reason = 'DriverBehavior';
        transactionHistoryItem.timeStamp = new Date();
        transactionHistoryItem.contract = contract;
        transactionHistoryItem.comments = 'Token reward based on driver behvior'

        renterAccount.balance += renterTokenReward;

        renterAccount.transactionHistory.push(transactionHistoryItem);
        
        // Update Renter Account with new transaction history item
        accountRegistry.update(renterAccount);

        let tokenTransferToRenterEvent = factory.newEvent(tokenNamespace, 'TokenTransferToRenterEvent');
        emit(tokenTransferToRenterEvent);
    }
    // Transfer Tokens to Fleet Owner on Trip Completion

    // Get Fleet Owner Registry
    let fleetOwnerRegistry = await getParticipantRegistry(participantsNamespace + '.FleetOwner');

    // Get Fleet Owner
    let fleetOwner = await fleetOwnerRegistry.get(contract.fleetOwner.getIdentifier());

    // Get Fleet Owner's account/wallet
    let foAccount = await accountRegistry.get(fleetOwner.account.getIdentifier());

    if(!foAccount.transactionHistory){
        foAccount.transactionHistory = [];
    }
    
    let foTokenReward = 100; // Reward 100 tokens to Fleet Owner on each tip completion
    let transactionHistoryItem  = factory.newConcept(tokenNamespace, 'TransactionHistory')

    transactionHistoryItem.type = 'Earn';
    transactionHistoryItem.category = 'Token';
    transactionHistoryItem.amount = foTokenReward;
    transactionHistoryItem.reason = 'TripCompletion';
    transactionHistoryItem.timeStamp = new Date();
    transactionHistoryItem.contract = contract;
    transactionHistoryItem.comments = 'Token reward on trip completion';
    
    foAccount.balance += foTokenReward;

    foAccount.transactionHistory.push(transactionHistoryItem);
    
    // Update Fleet Owner Account with new transaction history item
    accountRegistry.update(foAccount);

    let tokenTransferToFOEvent = factory.newEvent(tokenNamespace, 'TokenTransferToFOEvent');
    emit(tokenTransferToFOEvent);
}

