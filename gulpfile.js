'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const sassLint = require('gulp-sass-lint');
const eslint = require('gulp-eslint7')
const babel = require('gulp-babel')
const minify = require('gulp-minify')
const livereload = require('gulp-livereload')

const sassPath = './assets/sass/**/*'
const jsPath = './assets/js/**/*'

function css () {
  return gulp
    .src(sassPath)
    .pipe(sassLint({ configFile: '.sass-lint.yml' }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload())
}

function scripts () {
  return gulp
    .src(jsPath)
    .pipe(eslint())
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(minify({ ext: { min: '.min.js' }, noSource: true }))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload())
}

exports.default = function () {
  livereload.listen()
  gulp.watch(sassPath, css)
  gulp.watch(jsPath, scripts)
}
