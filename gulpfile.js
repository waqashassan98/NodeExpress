var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function(){
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish',{
            verbose: true
            }))
        .pipe(jscs());
});

gulp.task('inject', function(){
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css',
                              './public/js/*.js'], {read:false});

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public',
    };

    var injectOptions = {
        ignorePath: '/public'
    };

    return gulp.src('./src/views/*.html')
            .pipe(wiredep(options))
            .pipe(inject(injectSrc, injectOptions))
            .pipe(gulp.dest('./src/views'));
});

/** 
 * style and inject will run asynchrnously before serve's function
 */

gulp.task('serve', function (done) {
    var options = { script: 'index.js'
                    , ext: ['js', 'ejs']
                    ,env: {
                        'PORT': 3000,
                    }
                    // , ignore: ['ignored.js']
                    , tasks: ['style', 'inject'] 
                    , done: done
                };
    var stream = nodemon(options);
   
    stream
        .on('restart', function () {
          console.log('restarted!')
        })
        .on('crash', function() {
          console.error('Application has crashed!\n')
           stream.emit('restart', 10)  // restart the server in 10 seconds
        })
  })
