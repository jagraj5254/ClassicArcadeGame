const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

gulp.task('default', ['css', 'images', 'js', 'copy-html'], function(){
    gulp.watch('./src/css/**/*.css', ['css']);
    gulp.watch('/index.html', ['copy-html']);
});

gulp.task('css', function(){
    return gulp.src('./src/css/**/*.css')
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('copy-html', function(){
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist'));
})

gulp.task('images', function(){
    return gulp.src('./src/images/**/*.png')
        .pipe(imagemin({verbose: true}))
        .pipe(gulp.dest('./dist/images'))
})

gulp.task('js', function(){
    return gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
})
