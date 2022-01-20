// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { meta } from './environment.meta';

export const environment = {
  ...meta,
  production: false,
  test: false,
  // import: 'http://localhost:5000/import/',
  // import: 'http://localhost:5001/import/v2/',
  import: 'http://localhost:5001/import/v2/',
  // cleansing: 'http://localhost:5002/check',
  mapping: 'http://localhost:5003/mapping',
  // mapping: 'http://localhost:5001/mapping',
  cleansing: 'http://localhost:5004/check',
  // cleansing: 'https://dcm-datacheck.azurewebsites.net/check',
  // transform: 'https://dcm-transforming.azurewebsites.net/transfo/',
  transform: 'http://localhost:5002/transfo/',
  // admin: 'https://dcm-admin.azurewebsites.net/',
  admin: 'http://localhost:5000/',
  // upload: 'http://localhost:5004/upload/',
  upload: 'http://localhost:5005/upload/',
  auth: 'http://localhost:5010/',
  env: 'DEV',

  pipeline: 'http://localhost:5006/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
