var gulp = require('gulp'),
    connect = require('gulp-connect'),
    nodemon = require('gulp-nodemon');
 
 /*
gulp.task('connect', function() {
  connect.server({
    root: '',
    port: 3001,
    livereload: true,
    fallback: 'index.html'
  });
});
 
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/*'], ['html','js']);
});*/

gulp.task( 'server', function () {
  nodemon({
    script:     'node/index.js',
    env:        { 'NODE_ENV': 'development' },
    watch:      ['css', 'js', 'templates','node'],
    ext:        'html,js,css',
    delay:      2,
    nodeArgs:   ['--debug']
  })
      .on('start', function () {
        console.log('START');
      })
      .on('restart', function () {
        console.log('RESTART');
      });
});

gulp.task('default', ['server']);
