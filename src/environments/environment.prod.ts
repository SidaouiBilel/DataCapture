import { meta } from './environment.meta';

const packageJson = require('../../package.json');

export const environment = {
  ...meta,
  production: true,
  test: false,
  admin: 'http://localhost:5002/',
  import: 'http://localhost:5000/import/',
  // upload: 'http://localhost:5000/import/',
  mapping: 'http://localhost:5003/mapping',
  // mapping: 'http://localhost:5001/mapping',
  cleansing: 'http://localhost:5005/check',
  // TRANSFORMATION
  // transform: 'http://localhost:5000/transfo/'
  transform: 'http://localhost:5004/transfo/',
  upload: 'http://localhost:5006/upload/',
  auth: 'http://localhost:5001/',
  env: 'PRD'
};
