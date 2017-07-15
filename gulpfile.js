// 引入插件模块
var gulp = require("gulp"),
	// minifyCss = require("gulp-clean-css"),
	// uglify = require("gulp-uglify"),
	sass = require("gulp-sass"),
	livereload = require("gulp-livereload");

// gulp.task("minify", function(){
// 	gulp.src("css/*.css")
// 		.pipe(minifyCss())
// 		.pipe(gulp.dest("dist/css/"));
// });

// // 自定义任务，压缩 JS
// gulp.task("uglify", function(){
// 	gulp.src("js/*.js")
// 		.pipe(uglify())
// 		.pipe(gulp.dest("dist/js/"));
// });

// 自定义任务，编译SASS文件
gulp.task("sass", function(){
	gulp.src("sass/*.scss")
		.pipe(sass({outputStyle:"expanded"}))
		.pipe(gulp.dest("css/"))
		.pipe(livereload());
});

// 监听 scss 文件有修改，则自动调用编译 sass 文件的任务
gulp.task("watch", function(){
	livereload.listen();
	gulp.watch("sass/*.scss", ["sass"]);
});