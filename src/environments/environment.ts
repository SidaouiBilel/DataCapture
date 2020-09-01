// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  test: false,
  admin: 'https://dcm-admin.azurewebsites.net/',
  // admin: 'http://localhost:5000/',
  import: 'https://dcm-import.azurewebsites.net/import/',
  // upload: 'http://localhost:5000/import/',
  mapping: 'https://dcm-mapping.azurewebsites.net/mapping',
  // mapping: 'http://localhost:5001/mapping',
  cleansing: 'https://dcm-datacheck.azurewebsites.net/check',
  // cleansing: 'http://localhost:5000/check',
  // TRANSFORMATION
  // transform: 'http://localhost:5000/transfo/'
  transform: 'https://dcm-transforming.azurewebsites.net/transfo/',
  upload: 'https://dcm-upload.azurewebsites.net/upload/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
