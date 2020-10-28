const concat = require('concat');
const cpx = require('cpx');

(async function() {
  const dist = './dist/datacapture';
  const outputDirectory = './gen';
  const outputFile = 'data-app.js';

  const filesToConcat = [ `${dist}/runtime-es5.js`, `${dist}/polyfills-es5.js`, `${dist}/scripts.js`, `${dist}/main-es5.js` ];
  const filesToCopy = [ '[0-20]*.js', 'styles.css', 'common-es5.js' ];

  filesToCopy.forEach(filePattern => cpx.copySync(`${dist}/${filePattern}`, outputDirectory));
  await concat(filesToConcat, `${outputDirectory}/${outputFile}`);
})();
