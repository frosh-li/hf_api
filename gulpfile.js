var gulp = require('gulp');
var jshint = require('gulp-jshint');

// 根据jshintConfig的规则检测index.js文件
gulp.task('lint:js', function() {
    gulp.src(['./api/*.js','./app.js','./apiRouter.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
})
