// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { meta } from './environment.meta';

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
  // TRANSFORMATION
  // transform: 'http:///transfo/'
  transform: 'http://aendevccbe01:5004/transfo/',
  upload: 'http://aendevccbe01:5006/upload/',
  auth: 'http://aendevccbe01:5005/',
  env: 'DEV'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
