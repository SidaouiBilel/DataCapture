const packageJson = require('../../package.json');

export const environment = {
  production: true,
  test: false,
  admin: 'https://dcm-admin.azurewebsites.net/',
  import: 'https://dcm-import.azurewebsites.net/import/',
  // upload: 'http://localhost:5000/import/',
  mapping: 'https://dcm-mapping.azurewebsites.net/mapping',
  // mapping: 'http://localhost:5001/mapping',
  cleansing: 'https://dcm-datacheck.azurewebsites.net/check',
  // TRANSFORMATION
  // transform: 'http://localhost:5000/transfo/'
  transform: 'https://dcm-transforming.azurewebsites.net/transfo/',
  upload: 'https://dcm-upload.azurewebsites.net/upload/',
  auth: 'https://dcm-auth.azurewebsites.net/',
  version: '1.0.0',
  env: 'PRD'
};
