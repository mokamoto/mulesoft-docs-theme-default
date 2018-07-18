'use strict'
const vfs = require('vinyl-fs')
const merge = require('merge-stream')
const download = require('gulp-download-stream')
const buffer = require('vinyl-buffer')
const replace = require('gulp-replace')
const https = require('https');
const fs = require('fs');

const headerPath = 'https://www.mulesoft.com/api/header';
const headerFileName = 'header-shared.hbs';
const footerPath = 'https://www.mulesoft.com/api/footer';
const footerFileName = 'footer-shared.hbs';
const dependencies = 'https://www.mulesoft.com/api/dependencies';

function getHbs(url, fileName){
  https.get(url, function(response){
    let body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      const parsed = JSON.parse(body).data;
      fs.writeFileSync('partials/' + fileName, parsed);
    });
  });
};

function getDependencies(url, type){
  https.get(url, function(response){
    let body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      const parsed = JSON.parse(body).data;
      let styleLink = '';
      let scriptLink = '';
      for (let i = 0; i < parsed.styles.length; i++) {
        styleLink += `<link rel="stylesheet" href="${parsed.styles[i]}" type="text/css">`;
      }
      for (let i = 0; i < parsed.scripts.length; i++) {
        scriptLink += `<script src="${parsed.scripts[i]}"></script>`;
      }
      fs.writeFileSync('partials/head-shared.hbs', styleLink + scriptLink);
    });
  });
};

module.exports = () => {
  getHbs(headerPath, headerFileName);
  getHbs(footerPath, footerFileName);
  getDependencies(dependencies);
}
