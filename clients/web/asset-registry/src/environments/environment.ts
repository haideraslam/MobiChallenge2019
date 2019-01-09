// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginURL: 'http://aarvm-dev.westeurope.cloudapp.azure.com:3002/auth/google',
  baseAddressMultiUser: 'http://aarvm-dev.westeurope.cloudapp.azure.com:3002/',
  baseAddressSingleUser: 'http://aarvm-dev.westeurope.cloudapp.azure.com:3001/',
  webSocket: 'ws://aarvm-dev.westeurope.cloudapp.azure.com:3005',
  DASHBOARD_PATH: 'http://localhost:3300/dashboard'
  // loginURL: 'http://localhost:3002/auth/google',
  // baseAddressMultiUser: 'http://localhost:3002/',
  // baseAddressSingleUser: 'http://localhost:3001/',
  // webSocket: 'ws://localhost:3005'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
