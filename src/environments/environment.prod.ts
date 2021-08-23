import { meta } from './environment.meta';

const packageJson = require('../../package.json');

export const environment = {
  ...meta,
  production: false,
  test: false,

  import: 'http://localhost:5001/import/v2/',
  transform: 'http://localhost:5002/transfo/',
  auth: 'http://localhost:5010/',
  pipeline: 'http://localhost:5006/',
  admin: 'http://localhost:5003/',

  // import: 'http://localhost:5000/import/',
  // import: 'http://localhost:5001/import/v2/',
  // import: 'http://localhost:5001/import/v2/',
  // import: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-import/import/v2/',
  // cleansing: 'http://localhost:5002/check',
  mapping: 'http://localhost:5003/mapping',
  // mapping: 'http://localhost:5001/mapping',
  // cleansing: 'http://localhost:5005/check',
  cleansing: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-check/check',
  // transform: 'http://127.0.0.1:5008/transfo/',
  // transform: 'http://localhost:5002/transfo/',
  // admin: 'https://dcm-admin.azurewebsites.net/',
  // upload: 'http://localhost:5004/upload/',
  // upload: 'http://localhost:5004/upload/',
  upload: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-upload/upload/',

  // auth: 'http://localhost:5000/',
  // auth: 'http://20.74.12.165/dk-auth/',
  env: 'DEV',
};
