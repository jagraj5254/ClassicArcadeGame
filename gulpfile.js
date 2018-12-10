const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')

gulp.task('default', ['css', 'images'], function(){
    gulp.watch('./src/css/**/*.css', ['css']);
});

gulp.task('css', function(){
    return gulp.src('./src/css/**/*.css')
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('images', function(){
    return gulp.src('./src/images/**/*.png')
        .pipe(imagemin({verbose: true}))
        .pipe(gulp.dest('./dist/images'))
})