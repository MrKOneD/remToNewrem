var gulp = require('gulp');
var remRem = require('rem-rem-kp');

//创建es6转码任务
gulp.task('rem-rem', function() {
    return gulp.src('css/*.css')
        .pipe(remRem({}))
        .pipe(gulp.dest('cssRem'));
});

gulp.task('default', ['rem-rem']);