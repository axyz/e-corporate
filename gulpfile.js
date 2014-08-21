var gulp = require('gulp');

var sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    jshint      = require('gulp-jshint'),
    connect     = require('gulp-connect'),
    bowerFiles  = require('main-bower-files'),
    filter      = require('gulp-filter'),
    clean       = require('gulp-clean');


var paths = {
  src: __dirname,
  dist: 'dist',
  scripts: {
    src:  'js/**/*.js',
    dest: 'dist/js'
  },
  styles: {
    src:  'scss/*.scss',
    dest: 'dist/css'
  },
  static: 'static/**/*.*',
  images: {
    src:  'img/**/*.*',
    dest: 'dist/img'
  }
};


gulp.task('bower', function() {
  var jsFilter    = filter('*.js');
  var cssFilter   = filter('*.css');
  var fontFilter  = filter(['*.eot', '*.woff', '*.svg', '*.ttf']);

  gulp.src(bowerFiles())
    .pipe(jsFilter)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(jsFilter.restore())

    .pipe(cssFilter)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(cssFilter.restore())

    .pipe(fontFilter)
    .pipe(gulp.dest(paths.styles.dest + '/fonts'))
    .pipe(fontFilter.restore());
});


gulp.task('lint', function() {
  gulp.src(paths.scripts.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('sass', function() {
  gulp.src(paths.styles.src)
    .pipe(sass({
      includePaths: ['bower_components/foundation/scss'],
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(connect.reload());
});


gulp.task('minify', function() {
  gulp.src(paths.scripts.src)
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(connect.reload());
});


gulp.task('static', function() {
  gulp.src(paths.static)
    .pipe(gulp.dest(paths.dist))
    .pipe(connect.reload());
});


gulp.task('images', function() {
  gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
    .pipe(connect.reload());
});


gulp.task('server', function() {
  connect.server({
    root: paths.dist,
    port: 9000,
    livereload: true
  })
});


gulp.task('clean', function() {
  return gulp.src(paths.dist)
    .pipe(clean());
})


gulp.task('watch', ['server', 'bower', 'lint', 'sass', 'minify', 'static', 'images'], function() {
  gulp.watch([paths.static, paths.images.src], ['static']);

  gulp.watch(paths.scripts.src, ['lint', 'minify']);

  gulp.watch(paths.styles.src, ['sass']);
});


gulp.task('default', ['clean', 'bower', 'lint', 'sass', 'minify', 'static', 'images']);
