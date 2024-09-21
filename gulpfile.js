const gulp = require('gulp');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const zip = require('gulp-zip');

/* ----------------------------------------- */
/*  Compile Sass
/* ----------------------------------------- */

// Small error handler helper function.
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

const SYSTEM_SCSS = ["scss/**/*.scss"];
function compileScss() {
  // Configure options for sass output. For example, 'expanded' or 'nested'
  let options = {
    outputStyle: 'expanded'
  };
  return gulp.src(SYSTEM_SCSS)
    .pipe(
      sass(options)
        .on('error', handleError)
    )
    .pipe(prefix({
      cascade: false
    }))
    .pipe(gulp.dest("./css"))
}
const css = gulp.series(compileScss);

/* ----------------------------------------- */
/*  Watch Updates
/* ----------------------------------------- */

function watchUpdates() {
  gulp.watch(SYSTEM_SCSS, css);
}

/* ----------------------------------------- */
/*  Export Tasks
/* ----------------------------------------- */

exports.default = gulp.series(
  compileScss,
  watchUpdates
);
exports.build = gulp.series(
  compileScss
);
exports.css = css;

/* ----------------------------------------- */
/* Zip Release                  
/* ----------------------------------------- */

function zipRelease() {
  return gulp.src([
    './**/*',
    '!./node_modules/**',
    '!./.git/**',
    '!./.gitignore',
    '!./gulpfile.js',
    '!./package-lock.json',
    '!./package.json',
    '!./scss/**/*',
    '!./.github/**/*',
  ], { base: '.' })
  .pipe(zip('kids-on-brooms.zip'))
  .pipe(gulp.dest('.'));
}

exports.build = gulp.series(
  compileScss,
  zipRelease
);