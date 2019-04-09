const fs = require('fs');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const request = require('request');

function downloadProfileImage({ url, destPath }) {
  return getImageAsBuffer(url)
    .then(processImage)
    .then(writeBufferAsImage(destPath));
}

function getImageAsBuffer(url) {
  return new Promise((resolve, reject) => {
    // Null encoding means response body is type Buffer.
    request.get({ url, encoding: null }, (err, res, imageBuffer) => {
      if (err || res.statusCode >= 400) {
        return reject(
          err ||
            new Error(
              `Get profile image responded with status ${res.statusCode}`,
            ),
        );
      }
      resolve(imageBuffer);
    });
  });
}

function processImage(imageBuffer) {
  return imagemin.buffer(imageBuffer, {
    plugins: [
      imageminJpegtran({
        optimizationLevel: 7,
        progressive: true,
      }),
    ],
  });
}

function writeBufferAsImage(destPath) {
  return (imageBuffer) =>
    new Promise((resolve, reject) => {
      fs.writeFile(destPath, imageBuffer, { encoding: null }, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
}

module.exports = downloadProfileImage;
