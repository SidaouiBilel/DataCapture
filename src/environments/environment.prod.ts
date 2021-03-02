import { meta } from './environment.meta';

const packageJson = require('../../package.json');

export const environment = {
  ...meta,
  production: true,
  test: false,
  admin: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-admin/',
  import: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-import/import/v2/',
  //import: 'http://localhost:5000/import/v2',
  // upload: 'http://localhost:5000/import/',
  mapping: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-mapping//mapping',
  // mapping: 'http://localhost:5001/mapping',
  cleansing: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-check/check',
  // TRANSFORMATION
  // transform: 'http://localhost:5000/transfo/'
  transform: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-transforming/transfo/',
  upload: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-upload/upload/',
  auth: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-auth/',
  env: 'PRD',
  pipeline: 'http://ec2-15-237-114-68.eu-west-3.compute.amazonaws.com:5006/'
};
