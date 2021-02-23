import { meta } from './environment.meta';

export const environment = {
  ...meta,
  production: true,
  test: false,
  admin: 'http://aenuatccbe01:5000/',
  import: 'http://aenuatccbe01:5003/import/v2/',
  mapping: 'http://aenuatccbe01:5001/mapping',
  cleansing: 'http://aenuatccbe01:5002/check',
  transform: 'http://aenuatccbe01:5004/transfo/',
  upload: 'http://aenuatccbe01:5006/upload/',
  auth: 'http://aenuatccbe01:5005/',
  env: 'UAT'
};
