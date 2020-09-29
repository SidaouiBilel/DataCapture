// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { meta } from './environment.meta';

export const environment = {
  ...meta,
  production: false,
  test: false,
  import: 'https://dcm-import.azurewebsites.net/import/',
  mapping: 'https://dcm-mapping.azurewebsites.net/mapping',
  cleansing: 'https://dcm-datacheck.azurewebsites.net/check',
  transform: 'https://dcm-transforming.azurewebsites.net/transfo/',
  // admin: 'http://localhost:5000/',
  admin: 'https://dcm-admin.azurewebsites.net/',
  upload: 'https://dcm-upload.azurewebsites.net/upload/',
  auth: 'https://dcm-auth.azurewebsites.net/',
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
