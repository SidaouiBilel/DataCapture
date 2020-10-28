const uuidv1 = require('uuidv1');

module.exports = {
  output: {
    jsonpFunction: 'data-app-' + uuidv1()
  }
};
