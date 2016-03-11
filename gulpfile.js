var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    jade = require('gulp-jade'),
    sass = require('gulp-ruby-sass'),
    cssnano = require('cssnano'),
    browsersync = require('browser-sync'),
    reload = browsersync.reload,
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    uncss = require('gulp-uncss'),
    uglify = require('gulp-uglify'),
    // svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    path = require('path'),
    gulputil = require('gulp-util'),
    ghPages = require('gulp-gh-pages');

// scripts
gulp.task('scripts', function(){
  gulp.src('./src/js/**/*.js')
    .pipe(uglify().on('error', gulputil.log))
    .pipe(plumber())
    .pipe(gulp.dest('./dest/js'));
});

// img optimization
gulp.task('imagemin', function () {
    return gulp.src('./src/img/**/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dest/img'));
});

// sass2css
gulp.task('sass', function () {
  return sass('./src/css/**/*.sass')
    .pipe(plumber())
    .on('error', sass.logError)
    // .pipe(uncss({
    //         html: ['./dest/**/*.html']
    //     }))
    .pipe(gulp.dest('./src/css'));
});

// css postprocessing
gulp.task('css', function () {
  var processors = [
    autoprefixer,
    cssnano
  ];
  return gulp.src('./src/css/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dest/css'))
    .pipe(reload({stream:true}));
});

// jade2html
gulp.task('html', function() {
  gulp.src('./src/jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dest'))
    .pipe(reload({stream:true}));
});

// browser tasks
gulp.task('browsersync', function() {
    browsersync({
        server: {
            baseDir: './dest'
        }
    });
});

// deploy
gulp.task('deploy', function() {
  return gulp.src('./dest/**/*')
    .pipe(ghPages({
      "remoteUrl" : "https://github.com/sergekovbasyuk/inkpixel.git"
    }));
});


// watch
gulp.task('watch', function () {
   gulp.watch('./src/js/**/*.js', ['scripts']),
  //  gulp.watch('./src/img/icons/*', ['svgstore']),
   gulp.watch('./src/img/**/*', ['imagemin']),
   gulp.watch('./src/css/**/*.sass', ['sass']),
   gulp.watch('./src/css/**/*.scss', ['sass']),
   gulp.watch('./src/css/**/*.css', ['css']),
   gulp.watch('./src/jade/**/*.jade', ['html']);
});

// default
gulp.task('default', ['scripts', 'imagemin', 'sass', 'css', 'html', 'browsersync', 'watch']);
