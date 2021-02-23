import { meta } from './environment.meta';

export const environment = {
  ...meta,
  production: true,
  test: false,
  admin: 'http://aendevccbe01:5000/',
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
  env: 'PRD'
};
