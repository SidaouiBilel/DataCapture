// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { meta } from './environment.meta';

// export const environment = {
//   ...meta,
//   production: false,
//   test: false,
//   // import: 'http://localhost:5000/import/',
//   import: 'https://dcm-import.azurewebsites.net/import/v2/',
//   // import: 'http://localhost:5001/import/v2/',
//   // cleansing: 'http://localhost:5002/check',
//   mapping: 'https://dcm-mapping.azurewebsites.net/mapping',
//   // mapping: 'http://localhost:5001/mapping',
//   // cleansing: 'http://localhost:5000/check',
//   cleansing: 'https://dcm-datacheck.azurewebsites.net/check',
//   transform: 'https://dcm-transforming.azurewebsites.net/transfo/',
//   // transform: 'http://localhost:5002/transfo/',
//   // admin: 'https://dcm-admin.azurewebsites.net/',
//   admin: 'http://localhost:5000/',
//   // upload: 'http://localhost:5004/upload/',
//   upload: 'https://dcm-upload.azurewebsites.net/upload/',
//   // auth: 'https://dcm-auth.azurewebsites.net/',
//   auth: 'http://aendevccbe01:5005/',
//   env: 'DEV',

//   pipeline: 'http://localhost:5006/'
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const environment = {
  ...meta,
  production: false,
  test: false,
  // import: 'http://localhost:5000/import/',
  admin: 'http://aendevccbe01:5000/',
  // admin: 'http://localhost:5000/',
  import: 'http://aendevccbe01:5003/import/v2/',
  //upload: 'http://localhost:5000/import/',
  mapping: 'http://aendevccbe01:5001/mapping',
  // mapping: 'http://localhost:5001/mapping',
  cleansing: 'http://aendevccbe01:5002/check',
  transform: 'http://aendevccbe01:5004/transfo/',
  upload: 'http://aendevccbe01:5006/upload/',
  auth: 'http://aendevccbe01:5005/',
  pipeline: 'http://localhost:5006/',
  env: 'DEV'
};