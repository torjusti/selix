var gulp = require('gulp');
var uglify = require('gulp-uglify');
var coffee = require('gulp-coffee');
var rename = require('gulp-rename');

gulp.task('default', function() {
  gulp.src('src/selix.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('lib'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('lib'))
});

gulp.task('watch', function() {
  gulp.watch('src/default.coffee', ['default']);
});