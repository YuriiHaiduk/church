const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourceMaps = require('gulp-sourcemaps');
const imagemin = require("gulp-imagemin");
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');
const run = require("run-sequence");
const del = require("del");
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');


gulp.task('sass', function () {
  return gulp.src('scss/style.scss')
      .pipe(plumber())
      .pipe(sourceMaps.init())
      .pipe(sass())
      .pipe(autoprefixer({
        browsers: ['last 2 version']
      }))
      .pipe(sourceMaps.write())
      .pipe(gulp.dest('build/css'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function () {
  return gulp.src('*.html')
      .pipe(gulp.dest('build'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function () {
  return gulp.src('js/**/*.js')
      .pipe(gulp.dest('build/js'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function () {
  return gulp.src('css/**/*.css')
      .pipe(gulp.dest('build/css'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('allimg', function () {
  return gulp.src('img/**/*.{png,jpg}')
      .pipe(gulp.dest('build/img'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function () {
  return gulp.src('build/img/**/*.{png,jpg}')
      .pipe(imagemin([
          imagemin.jpegtran({progressive: true}),
          imageminJpegRecompress({
            loops: 5,
            min: 65,
            max: 70,
            quality: 'medium'
          }),
          imagemin.optipng({optimizationLevel: 3}),
          pngquant({quality: '65-70', speed: 5})
      ]))
      .pipe(gulp.dest('build/img'));
});

gulp.task('svg', function () {
  return gulp.src('img/**/*.svg')
      .pipe(svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe(cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
      }))
      .pipe(replace('&gt;', '>'))
      // build svg sprite
      .pipe(svgSprite({
        mode: {
          symbol: {
            sprite: "sprite.svg"
          }
        }
      }))
      .pipe(gulp.dest('build/img'));
});

gulp.task('server', function () {
  browserSync.init({
    server: "build"
  });

  gulp.watch("scss/**/*.scss", ["sass"]);
  gulp.watch("*.html", ["html"]);
  gulp.watch("js/**/*.js", ["js"]);
  gulp.watch("css/**/*.css", ["css"]);
  gulp.watch("img/**/*.{png,jpg}", ["allimg"]);
  gulp.watch("img/**/*.{svg}", ["svg"]);
});

gulp.task('copy', function () {
  return gulp.src([
      'img/**',
      'js/**',
      'css/**',
      '*.html'
  ], {
    base: '.'
  })
      .pipe(gulp.dest('build'));

});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('build', function (fn) {
  run(
    'clean',
    'copy',
    'sass',
    'images',
    'svg',
    fn
  );
});
