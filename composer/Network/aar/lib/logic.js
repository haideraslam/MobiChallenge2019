
'use strict';

const namespace = 'netsol.innovation.aar.vehicle.lease';
const vehicleNamespace = 'netsol.innovation.aar.vehicle.model';
const participantNamespace = 'netsol.innovation.aar.participants.model';
const usecaseNamespace = 'netsol.innovation.aar.usecase.model';

// MANUFACTURER FUNCTIONS
/**
 * Allocate a car to FC. Only manufacturer should be able to do this.
 * @param {netsol.innovation.aar.vehicle.lease.AllocateCarToFc} allocateCarToFc - the allocateCarToFc transaction
 * @transaction
 */
async function allocateCarToFc(allocateRequest) {
    console.log('allocateToFcRequest - Start!');

    const factory = getFactory();
    
    const leaseDeal = allocateRequest.vehicle.currentLeaseDeal;
    leaseDeal.financeCompany = factory.newRelationship(participantNamespace, 'FinanceCompany', allocateRequest.financeCompany.getIdentifier());
    const leaseDealReg = await getAssetRegistry(namespace + '.VehicleLeaseDeal');
    leaseDeal.status = 'OEM_TO_FC_ALLOCATED';
    await leaseDealReg.update(leaseDeal);
  
    console.log('allocateToFcRequest - Done!');
}

//AllocateCarToDealer
/**
 * Allocate a car to Dealer. Only FC should be able to do this.
 * @param {netsol.innovation.aar.vehicle.lease.AllocateCarToDealer} allocateCarToDealer - the allocateCarToDealer transaction
 * @transaction
 */
async function allocateCarToDealer(allocateRequest) {
    console.log('allocateCarToDealer - start');

    const factory = getFactory();

    const leaseDeal = allocateRequest.vehicle.currentLeaseDeal;
    leaseDeal.dealer = factory.newRelationship(participantNamespace, 'Dealer', allocateRequest.dealer.getIdentifier());
    const leaseDealReg = await getAssetRegistry(namespace + '.VehicleLeaseDeal');
    leaseDeal.status = 'FC_TO_DEALER_ALLOCATED';
    await leaseDealReg.update(leaseDeal);

    console.log('allocateCarToDealer - done');
}

// USECASE FUNCTIONS
/**
 * Allocate a car to a Usecase e.g. OTOZ (Car sharing application)
 * @param {netsol.innovation.aar.usecase.model.AllocateCarToUsecase} allocateCarToUsecase - the allocateCarToUsecase transaction
 * @transaction
 */
async function allocateCarToUsecase(allocateRequest) {
    console.log('allocateToUsecaseRequest - Start!');

    const factory = getFactory();
    
    let vehicle = allocateRequest.vehicle;
    vehicle.usecase = factory.newRelationship(usecaseNamespace, 'Usecase', allocateRequest.usecase.getIdentifier());
    const vehicleReg = await getAssetRegistry(vehicleModelNamespace + '.Vehicle');
    await vehicleReg.update(vehicle);
  
    console.log('allocateToUsecaseRequest - Done!');
}