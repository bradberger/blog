var gulp = require("gulp"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    less = require("gulp-less"),
    changed = require("gulp-changed"),
    watch = require("gulp-watch"),
    minifyCSS = require("gulp-minify-css"),
    imagemin = require("gulp-imagemin"),
    svgmin = require("gulp-svgmin"),
    minifyHTML = require("gulp-minify-html"),
    uglify = require("gulp-uglify"),
    rimraf = require("gulp-rimraf"),
    lr = require("tiny-lr"),
    lrserver = lr(),
    ecstatic = require("ecstatic"),
    http = require("http"),
    refresh = require("gulp-livereload"),
    livereloadport = 35729,
    serverport = 9000,
    uncss = require("gulp-uncss"),
    exec = require("child_process").exec,
    fs = require("fs");


function p(path) {
    return __dirname + (path.charAt(0) === "/" ? "" : "/") + path;
}

gulp.task("serve", function() {
  http.createServer(ecstatic({
    root: __dirname + "/public"
  })).listen(serverport);
  lrserver.listen(livereloadport);
});

gulp.task("minify-html", function() {
  var opts = { comments: true, spare: true };
  gulp.src("./public/**/*.html")
      .pipe(minifyHTML(opts))
      .pipe(gulp.dest("./public"));
});

gulp.task("less", function() {
  return gulp.src("./src/less/style.less")
      .pipe(less())
      .on( "error", function( err ) {
          console.error(err.message);
      })
      //.pipe(uncss({
      //  html: [
      //    "./public/index.html",
      //    "./public/blog/index.html",
      //    "./public/blog/optimizing-css/index.html",
      //    "./public/blog/optimizing-php/index.html",
      //    "./public/showcase/index.html"
      //  ],
      //  ignore: [
      //    ".side-nav", /large-[\d]+/, /medium-[\d]+/, /small-[\d]+/,
      //  ]
      //}))
      .pipe(minifyCSS())
      .pipe(gulp.dest("./static/css"))
      .pipe(refresh(lrserver));
});

gulp.task("svg-min", function() {
  return gulp.src("./src/svg/**/*.svg")
      .pipe(svgmin())
      .pipe(gulp.dest("./static/svg"));
});

gulp.task("js", function() {
  gulp.src("./src/js/**/*.js")
      .pipe(uglify({ outSourceMap: true }))
      .pipe(rename({suffix: ".min"}))
      .pipe(gulp.dest("./static/js"))
      .pipe(refresh(lrserver));
});

gulp.task("image-min", function() {
  return gulp.src("./src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./static/img"));
});

gulp.task("clean", function() {
   return gulp.src(p("dist/**/*", {read: false}))
       .pipe(rimraf());
});

gulp.task("build", [
  "image-min", "svg-min", "sass", "js"
]);

gulp.task("test", function() {

    var bytesMin = 2000,
        htmlStats = fs.statSync(p("public/index.html")),
        cssStats = fs.statSync(p("public/dist/css/main.min.css"));

    if(htmlStats.size < bytesMin || cssStats.size < bytesMin) {
        console.error("Hugo didn't seem to build properly");
        process.exit(1);
    }

});

gulp.task("watch", function() {
  gulp.watch("./src/less/**/*.less", ["less"]);
  gulp.watch("./src/js/**/*.js", ["js"]);
  gulp.watch("./src/img/**/*", ["image-min"]);
});

gulp.task("default", ["build", "watch", "serve"]);
