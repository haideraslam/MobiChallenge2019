##One time setup
Ensure dotnet core is installed on your machine. Run dotnet --version to verify.
If its not, please install from: https://www.microsoft.com/net/download/all

##Run in dev mode
PART 1 - Get dependencies
`cd remote-control`
`dotnet restore`

PART 2 - Execute the application
`dotnet run <args>`

This application takes 3 args. All strings
1.  remoteFunc : Name of remote function to invoke on the device (Lock/Unlock).
2.  vin: VIN of the car on which the function should be invoked
3.  contractId: contractId associated with the car lock/unlock request.

##Example run command:
dotnet run Lock WP0ZZZ99ZJS167001 19277
dotnet run Unlock WP0ZZZ99ZJS167005 43245