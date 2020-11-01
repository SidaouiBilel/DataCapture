const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/datacapture/main-es2015.js',
    './dist/datacapture/main-es5.js',
    './dist/datacapture/polyfills-es2015.js',
    './dist/datacapture/polyfills-es5.js',
    './dist/datacapture/runtime-es2015.js',
    './dist/datacapture/runtime-es5.js',
    './dist/datacapture/scripts.js'
  ]

  await fs.ensureDir('gen')
  await concat(files, 'gen/user-poll.js')
})()