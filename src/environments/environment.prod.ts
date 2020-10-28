import { meta } from './environment.meta';

const packageJson = require('../../package.json');

export const environment = {
  ...meta,
  production: true,
  test: false,
  //admin: 'http://localhost:5002/',
  admin: 'http://ac0b933ce948d409c964edc04005e5bd-1554195617.eu-west-3.elb.amazonaws.com/',
  //import: 'http://localhost:5000/import/',
  import: 'http://a8b41132de2dc41baa67d550c73f6171-2042249671.eu-west-3.elb.amazonaws.com/import/',
  // upload: 'http://localhost:5000/import/',
  //mapping: 'http://localhost:5003/mapping',
  mapping: 'http://a541f2b7b54ea4230a78c774972e8ac5-182161587.eu-west-3.elb.amazonaws.com/mapping',
  // mapping: 'http://localhost:5001/mapping',
  //cleansing: 'http://localhost:5005/check',
  cleansing:'http://a6a72ba82391a481faf70b9c57bda0ef-1155898634.eu-west-3.elb.amazonaws.com/check',
  // TRANSFORMATION
  // transform: 'http://localhost:5000/transfo/'
  //transform: 'http://localhost:5004/transfo/',
  transform: 'http://a07b51700db8f4c0d948123a05bf5404-1718889584.eu-west-3.elb.amazonaws.com/transfo/',
  //upload: 'http://localhost:5006/upload/',
  upload:'http://a639a20b446ca46f2a463cb206e7ca06-1781217483.eu-west-3.elb.amazonaws.com/upload/',
  //auth: 'http://localhost:5001/',
  auth:'http://a2e9394e012b340deb401c155c14fd62-121625260.eu-west-3.elb.amazonaws.com/',
  connector:'http://ae4ac4a0e7fe54b59b2fe6577ad5aeb7-966793033.eu-west-3.elb.amazonaws.com/',
  env: 'PRD'
};
