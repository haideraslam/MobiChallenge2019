// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SINGLE_USER: 'http://aarvm-dev.westeurope.cloudapp.azure.com:3001/',
  MULTI_USER: 'http://aarvm-dev.westeurope.cloudapp.azure.com:3000/',
  LOGED_IN_REDIRECT: 'http://aarvm-dev.westeurope.cloudapp.azure.com:81/loggedIn',
  TRANSACTION_HISTORY: 'http://aarvm-dev.westeurope.cloudapp.azure.com:3001/api/system/historian',
  PICK_UP_PATH: 'http://aarvm-dev.westeurope.cloudapp.azure.com:3300/pick-up/',
  DROP_OFF_PATH: 'http://aarvm-dev.westeurope.cloudapp.azure.com:3300/drop-off/'
  // SINGLE_USER: 'http://localhost:3001/',
  // MULTI_USER: 'http://localhost:3000/',
  // LOGED_IN_REDIRECT: 'http://localhost:4300/loggedIn',
  // TRANSACTION_HISTORY: 'http://localhost:3001/api/system/historian',
  // PICK_UP_PATH: 'http://localhost/pickup/',
  // DROP_OFF_PATH: 'http://localhost/dropoff/'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
