# OTOZ

- Creates a digital twin of each asset/vehicle, capturing relevant data using IoT and transforming this data into insights by applying AI and ML. 
- Democratizes data to third-parties to create new and innovative business models 
- Tokenises vehicle assets, creating new forms of vehicle ownership and revenue streams. 
- creates a circular economy leveraging a utility token, aligning incentives across all stakeholders in the mobility ecosystem.

# Demo Application 

Demo app could be accessed using following credentials:

## Fleet Owner Application
- URL: http://aarvm-dev.westeurope.cloudapp.azure.com:81
- User: otoz.fleet.owner@gmail.com
- Password: mobichallenge2019

## Renter Application
- URL: http://aarvm-dev.westeurope.cloudapp.azure.com
- User: otoz.renter@gmail.com
- Password: mobichallenge2019


# Configure Development Environment

The codebase contains following folders of concern:

- clients
- composer
- api
- iot

clients folder contains web and mobile client applications

composer folder contains hyperledger fabric code, inclusing business network specification and chaincodes

api folder contains api and a few hosted iFrames and services

iot folder contains iot simulaters and related services to manage push and pull data from iot devices to blockchain and vice versa


# Deployment

All the components are containerized and can be run using common docker commands. Please see docker-compose.yml file in respective folders for details.

If you need any help regarding deployment, please send an email to haider.aslam@netsoltech.com
