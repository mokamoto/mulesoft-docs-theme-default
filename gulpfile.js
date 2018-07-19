'use strict'

const path = require('path')
const gulp = require('gulp')
const runSequence = require('run-sequence');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');

const config = require('./config')
const build = require('./tasks/build')
const buildPreview = require('./tasks/build-preview')
const pack = require('./tasks/pack')
const preview = require('./tasks/preview')
const release = require('./tasks/release')
const update = require('./tasks/update')

try {
  config.validate({ allowed: 'strict' })
}
catch (error) {
  error.message.split('\n').forEach((message) => { console.error('Bad config -', message) })
  // 9 - Invalid Argument; see https://nodejs.org/api/process.html#process_exit_codes
  process.exit(9)
}

const src = config.get('source')
const dest = config.get('destination')
const destTheme = path.join(dest, config.get('theme_destination'))

const sassDir = 'stylesheets/**/*.scss';
const sassSrc = 'stylesheets/index.scss';
const sassDist = 'build/_theme/stylesheets';

// styles
gulp.task('sass', function() {
  return gulp.src(sassSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      remove: false
    }))
    .on('error', function(err){
      console.log(err.message);
    })
    .pipe(gulp.dest(sassDist));
});

gulp.task('build', () =>
  build(src, destTheme, config.get('cache_buster'))
)

gulp.task('build-preview', ['build'], () =>
  buildPreview(src, dest, destTheme)
)

gulp.task('preview', ['build-preview'], () =>
  preview({ dest, port: config.get('port') }, () => gulp.start('build-preview'))
)

gulp.task('pack', ['build'], () =>
  pack({ repo: config.get('repository.name'), dest, destTheme })
)

gulp.task('release', ['pack'], () =>
  release({
    owner: config.get('repository.owner'),
    repo: config.get('repository.name'),
    token: config.get('github_token'),
    dest
  })
)

gulp.task('update', () =>
  update()
)

// dev build and watch scss
gulp.task('dev', function(cb) {
  runSequence('sass', cb);
  gulp.watch(sassDir, ['sass']);
});
