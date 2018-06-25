var gp = require('gulp')
var webpack = require('webpack')
var ftp = require('gulp-ftp')
var gulpSequence = require('gulp-sequence')

gp.task('webpack', cb => {
  var webpackConfig = require('./build/webpack.prod.conf')
  webpack(webpackConfig, function (err, stats) {
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n')
    cb && cb()
  });
});

gp.task('ftp', cb => {
  var ftpConfig = {
    host: '120.78.69.215',
    port: 21,
    user: 'administrator',
    pass: 'YJS@comcn',
    remotePath: `/web/mobileweb/`
  }
  return gp.src('dist/**/*').pipe(ftp(ftpConfig));
});

gp.task('build', gulpSequence('webpack', 'ftp'));
