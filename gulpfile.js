const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
  // Identificar el archivo de SASS
  // Compilarlo
  // Guardarlo en un archivo CSS
  src('src/scss/**/*.scss').pipe(plumber()).pipe(sass()).pipe(dest('build/css'));

  done(); // callback que le avisa a gulp que ya terminé
}

function imagenes(done) {
  const opciones = {
    optimizationLevel: 3,
  };
  src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'));

  done();
}

function versionWebp(done) {
  const opciones = {
    quality: 50,
  };
  src('src/img/**/*.{png,jpg}').pipe(webp(opciones)).pipe(dest('build/img'));

  done(); // callback que le avisa a gulp que ya terminé
}

function versionAvif(done) {
  const opciones = {
    quality: 50,
  };
  src('src/img/**/*.{png,jpg}').pipe(avif(opciones)).pipe(dest('build/img'));

  done(); // callback que le avisa a gulp que ya terminé
}

function dev(done) {
  watch('src/scss/**/*.scss', css);

  done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);
dev;
