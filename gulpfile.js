var gulp = require('gulp'),
    connect = require('gulp-connect'),
    nodemon = require('gulp-nodemon');
 
gulp.task('connect', function() {
  connect.server({
    root: '',
    port: 3000,
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

});


gulp.task('nodemon', function () {
  nodemon({ script: 'node/index.js'
    , ext: 'html js' })
      .on('restart', function () {
        console.log('restarted!')
      })
});



gulp.task( 'server', function () {
  nodemon({
    script:     'node/index.js',
    env:        { 'NODE_ENV': 'development' },
    watch:      ['./views', './controllers', './models','./libs'],
    ext:        'html,js',
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



gulp.task('default', ['connect', 'watch', 'server']);
