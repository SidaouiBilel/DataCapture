const packageJson = require('../../package.json');

export const environment = {
  production: true,
  test: false,
  admin: 'https://dcm-admin.azurewebsites.net/',
  upload: 'https://dcm-import.azurewebsites.net/import/',
  // upload: 'http://localhost:5000/import/',
  mapping: 'https://dcm-mapping.azurewebsites.net/mapping',
  // mapping: 'http://localhost:5001/mapping',
  cleansing: ''
};
