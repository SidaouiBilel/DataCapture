// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { meta } from './environment.meta';

export const environment = {
  ...meta,
  production: false,
  test: false,

  admin: 'http://localhost:5001/',
  import: "http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-import/import/v2/",
  mapping: "http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-mapping//mapping",
  cleansing: "http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-check/check",
  upload: "http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-upload/upload/",
  dkAuth: "http://ec2-3-236-14-93.compute-1.amazonaws.com:9001/api/v1/store/auth/",
  prefix:"http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/",

  transform: "http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-transforming/transfo/",

  auth: 'http://localhost:5000/',
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
