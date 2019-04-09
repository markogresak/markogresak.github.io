const rimraf = require('rimraf');

function rimrafArray(paths) {
  return Promise.all(paths.map(rimrafToPromise));
}

function rimrafToPromise(path) {
  return new Promise((resolve, reject) => {
    rimraf(path, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

module.exports = rimrafArray;
