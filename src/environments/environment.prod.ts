import { meta } from './environment.meta';

const packageJson = require('../../package.json');

export const environment = {
  ...meta,
  production: true,
  test: false,
  //admin: 'http://localhost:5002/',
  admin: 'http://a7cce52522e1f40ad93fc93133e112c0-591827199.eu-west-3.elb.amazonaws.com/',
  //import: 'http://localhost:5000/import/',
  import: 'http://aefc3f91eadd24bf4a931c6844fedfd7-1177335138.eu-west-3.elb.amazonaws.com/import/',
  // upload: 'http://localhost:5000/import/',
  //mapping: 'http://localhost:5003/mapping',
  mapping: 'http://a62d303806e5e46fea0779f8eb63a025-2052241660.eu-west-3.elb.amazonaws.com/mapping',
  // mapping: 'http://localhost:5001/mapping',
  //cleansing: 'http://localhost:5005/check',
  cleansing:'http://ace6f459430284412ae6c25cb18a80be-1203421319.eu-west-3.elb.amazonaws.com/check',
  // TRANSFORMATION
  // transform: 'http://localhost:5000/transfo/'
  //transform: 'http://localhost:5004/transfo/',
  transform: 'http://ad8c2b8fb1754401eb245de199d2e870-1494105420.eu-west-3.elb.amazonaws.com/transfo/',
  //upload: 'http://localhost:5006/upload/',
  upload:'http://a7e2348fc030244b6bda9b25b54db41a-1476191407.eu-west-3.elb.amazonaws.com/upload/',
  //auth: 'http://localhost:5001/',
  auth:'http://a0617fcf80a6740ddadb1306c293ac46-1562785039.eu-west-3.elb.amazonaws.com/',
  env: 'PRD'
};
