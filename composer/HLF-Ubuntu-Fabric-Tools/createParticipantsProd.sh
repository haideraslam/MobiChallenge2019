#!/bin/bash
echo "Creating token accounts..."
composer transaction submit --card admin@aar -d '{"$class": "org.hyperledger.composer.system.AddAsset", "targetRegistry": "resource:org.hyperledger.composer.system.AssetRegistry#netsol.innovation.aar.token.model.Account", "resources": [{ "$class": "netsol.innovation.aar.token.model.Account", "address": "8a50dedb-c1d0-43e3-abf8-8ef2bd08d922", "balance": 500 }]}'
composer transaction submit --card admin@aar -d '{"$class": "org.hyperledger.composer.system.AddAsset", "targetRegistry": "resource:org.hyperledger.composer.system.AssetRegistry#netsol.innovation.aar.token.model.Account", "resources": [{ "$class": "netsol.innovation.aar.token.model.Account", "address": "b79328bb-8f61-4c5c-93d8-f7a335c54459", "balance": 1000 }]}'
echo "Adding participants..."
composer participant add -c admin@aar -d '{ "$class": "netsol.innovation.aar.participants.model.Renter", "firstName": "John", "lastName": "Smith", "contactDetails": { "$class": "netsol.innovation.aar.participants.model.ContactDetails" }, "Dob": "1980-08-10T07:15:35.399Z", "bpId": "RNTR1", "title": "John Smith", "account": "resource:netsol.innovation.aar.token.model.Account#8a50dedb-c1d0-43e3-abf8-8ef2bd08d922" }'
composer participant add -c admin@aar -d '{ "$class": "netsol.innovation.aar.participants.model.FleetOwner", "bpId": "FO1", "title": "FO1", "account": "resource:netsol.innovation.aar.token.model.Account#b79328bb-8f61-4c5c-93d8-f7a335c54459" }'
echo "Issuing identities..."
composer identity issue --card admin@aar -u renter -a netsol.innovation.aar.participants.model.Renter#RNTR1
composer identity issue --card admin@aar -u fleetowner -a netsol.innovation.aar.participants.model.FleetOwner#FO1
