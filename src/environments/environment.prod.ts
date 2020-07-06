const packageJson = require('../../package.json');

export const environment = {
  production: true,
  test: false,
  projects: 'http://dev.deepkube.io/api/projects',
  environments: 'http://dev.deepkube.io/api/objects/environments',
  clusters: 'http://dev.deepkube.io/api/clusters',
  datasets: 'http://dev.deepkube.io/api/datasets'
};
