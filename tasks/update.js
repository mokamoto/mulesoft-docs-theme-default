'use strict'
const vfs = require('vinyl-fs')
const merge = require('merge-stream')
const download = require('gulp-download-stream')
const buffer = require('vinyl-buffer')
const replace = require('gulp-replace')


function assetDownload(url, filename, destination){
  return download({
          url: url,
          file: filename
  }).pipe(buffer()).pipe(vfs.dest(destination))
}

module.exports = () => {
  return merge([
      // markup
      assetDownload('https://mulesoft.com/markup/get/header?searchbox=false', 'header-shared.hbs', 'partials'),
      assetDownload('https://mulesoft.com/markup/get/footer', 'footer-shared.hbs', 'partials'),
      // scripts
      assetDownload('https://code.jquery.com/jquery-1.12.4.min.js', '04-jquery-1.12.4.min.js', 'scripts'),
      assetDownload('https://app-abd.marketo.com/js/forms2/js/forms2.min.js', '06-form2.min.js', 'scripts'),
      assetDownload('https://www.mulesoft.com/sites/all/themes/muletheme/js/header-footer.js', '05-header-footer.js', 'scripts'),
  ])
}
