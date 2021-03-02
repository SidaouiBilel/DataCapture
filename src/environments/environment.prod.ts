import { meta } from './environment.meta';

export const environment = {
  ...meta,
  production: true,
  test: false,
  env: 'PRD',
  deployURL:"http://af0ce28e5554549b3bf5476ae4ed648e-1225037206.eu-west-1.elb.amazonaws.com/"
  // admin: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-admin/',
  // import: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-import/import/v2/',
  // mapping: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-mapping//mapping',
  // cleansing: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-check/check',
  // transform: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-transforming/transfo/',
  // upload: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-upload/upload/',
  // auth: 'http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/dk-auth/',
  // pipeline: 'http://ec2-15-237-114-68.eu-west-3.compute.amazonaws.com:5006/',
  // prefix:"http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/" , 
};
