var gulp = require("gulp");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var watch = require("gulp-watch");
var minifyCSS = require("gulp-minify-css");
var imagemin = require("gulp-imagemin");
var insert = require("gulp-insert");
var minifyHTML = require("gulp-minify-html");
var uglify = require("gulp-uglify");
var uncss = require("gulp-uncss");
var jshint = require("gulp-jshint");
var del = require("del");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var runSequence = require("run-sequence");
var vinylPaths = require("vinyl-paths");
var size = require("gulp-size");
var p = function(path) {
  return __dirname + (path.charAt(0) === "/" ? "" : "/") + path;
};

gulp.task("minify-html", function () {
  return gulp
    .src(p("public/**/*.html"))
    .pipe(minifyHTML({ comments: true, spare: true }))
    .pipe(gulp.dest(p("public")));
});

gulp.task("scss", function() {
  return gulp
    .src("src/scss/style.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(uncss({ html:["public/**/*.html"] }))
    .pipe(minifyCSS())
    .pipe(size({ prettySize: true, gzip: true }))
    .pipe(insert.prepend("<style>"))
    .pipe(insert.append("</style>"))
    .pipe(rename("above.html"))
    .pipe(gulp.dest(p("layouts/chrome")));
});

gulp.task("js:init", function () {
  return gulp
    .src([p("src/js/init.js")])
    .pipe(uglify({outSourceMap: false}))
    .pipe(insert.prepend("<script>"))
    .pipe(insert.append("</script>"))
    .pipe(rename("scripts.html"))
    .pipe(gulp.dest(p("layouts/chrome")));
});

gulp.task("image-min", function () {
  return gulp
    .src(p("src/img/**/*"))
    .pipe(imagemin())
    .pipe(gulp.dest(p("static/img")));
});

gulp.task("jshint", function() {
  return gulp
    .src(p("src/js/**/*.js"))
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

gulp.task("pre-build", [
    "image-min", "svg-min", "less", "js:init"
]);

gulp.task("post-build", ["minify-html"]);

gulp.task("watch", function () {
    gulp.watch(p("src/scss/**/*.scss"), ["scss"]);
    gulp.watch(p("src/js/init.js"), ["js:init"]);
    gulp.watch(p("src/img/**/*"), ["image-min"]);
});

gulp.task("clean", function() {
  return gulp
    .src(p("public/*"))
    .pipe(vinylPaths(del));
});

gulp.task("build", function() {
    return runSequence("scss", "javascript", []);
});

gulp.task("default", ["build", "watch"]);
