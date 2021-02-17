import { meta } from './environment.meta';

const packageJson = require('../../package.json');

export const environment = {
  ...meta,
  production: true,
  test: false,
  admin: 'http://ac0b933ce948d409c964edc04005e5bd-1554195617.eu-west-3.elb.amazonaws.com/',
  import: 'https://dcm-import.azurewebsites.net/import/v2/',
  // upload: 'http://localhost:5000/import/',
  mapping: 'https://dcm-mapping.azurewebsites.net/mapping',
  // mapping: 'http://localhost:5001/mapping',
  cleansing: 'https://dcm-datacheck.azurewebsites.net/check',
  // TRANSFORMATION
  // transform: 'http://localhost:5000/transfo/'
  transform: 'https://dcm-transforming.azurewebsites.net/transfo/',
  upload: 'https://dcm-upload.azurewebsites.net/upload/',
  auth: 'http://a2e9394e012b340deb401c155c14fd62-121625260.eu-west-3.elb.amazonaws.com/',
  env: 'PRD',
  pipeline: 'http://localhost:5006/'
};
