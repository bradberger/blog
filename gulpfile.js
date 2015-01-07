var gulp = require("gulp"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    less = require("gulp-less"),
    changed = require("gulp-changed"),
    watch = require("gulp-watch"),
    minifyCSS = require("gulp-minify-css"),
    imagemin = require("gulp-imagemin"),
    svgmin = require("gulp-svgmin"),
    insert = require("gulp-insert"),
    minifyHTML = require("gulp-minify-html"),
    uglify = require("gulp-uglify"),
    uncss = require("gulp-uncss"),
    exec = require("child_process").exec,
    jshint = require("gulp-jshint"),
    del = require("del"),
    runSequence = require("run-sequence"),
    shell = require("gulp-shell"),
    rsync = require("gulp-rsync"),
    fs = require("fs");


function p(path) {
    return __dirname + (path.charAt(0) === "/" ? "" : "/") + path;
}

gulp.task("minify-html", function () {
    return gulp.src(p("public/**/*.html"))
        .pipe(minifyHTML({comments: true, spare: true}))
        .pipe(gulp.dest("./public"));
});

gulp.task("less:above", function() {
    return gulp.src(p("src/less/above.less"))
        .pipe(less())
        .on("error", function (err) {
            console.error(err.message);
        })
        .pipe(uncss({
            html: [
                p("public/index.html"),
                p("public/promise-based-js-script-loader/index.html"),
                p("public/tags/about/index.html"),
                p("public/categories/pages/index.html")
            ],
            ignore: [".highlight", ".highlight pre"]
        }))
        .pipe(minifyCSS({keepSpecialComments: 0}))
        .pipe(gulp.dest(p("static/css")));
});

gulp.task("html:above", function() {
    return gulp.src("./static/css/above.css")
        .pipe(insert.prepend("<style>"))
        .pipe(insert.append("</style>"))
        .pipe(rename("above.html"))
        .pipe(gulp.dest("./layouts/chrome"));
});

gulp.task("less:standard", function () {
    return gulp.src("./src/less/style.less")
        .pipe(less())
        .pipe(uncss({
            html: [
                p("public/index.html"),
                p("public/promise-based-js-script-loader/index.html"),
                p("public/tags/about/index.html"),
                p("public/categories/pages/index.html")
            ],
            ignore: [".highlight pre"]
        }))
        .pipe(minifyCSS({keepSpecialComments: 0}))
        .on("error", function (err) {
            console.error(err.message);
        })
        .pipe(gulp.dest("./static/css"));

});

gulp.task("less", function () {
    return runSequence("less:above", "less:standard", "html:above");
});

gulp.task("svg-min", function () {
    return gulp.src("./src/svg/**/*.svg")
        .pipe(svgmin())
        .pipe(gulp.dest("./static/svg"));
});

gulp.task("js:init", function () {
    return gulp.src([
        p("src/js/init.js")
    ])
        .pipe(uglify({outSourceMap: false}))
        .pipe(insert.prepend("<script>"))
        .pipe(insert.append("</script>"))
        .pipe(rename("scripts.html"))
        .pipe(gulp.dest("./layouts/chrome"));
});

gulp.task("image-min", function () {
    return gulp.src("./src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./static/img"));
});


gulp.task("jshint", function() {
    return gulp.src(p("src/js/**/*.js"))
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task("pre-build", [
    "image-min", "svg-min", "less", "js:init"
]);

gulp.task("test", function () {

    var bytesMin = 2000,
        htmlStats = fs.statSync(p("public/index.html")),
        cssStats = fs.statSync(p("public/css/style.css"));

    if (htmlStats.size < bytesMin || cssStats.size < bytesMin) {
        console.error("Hugo didn't seem to build properly");
        process.exit(1);
    }

});

gulp.task("post-build", ["minify-html"]);

gulp.task("watch", function () {
    gulp.watch("./src/less/**/*.less", ["less"]);
    gulp.watch("./src/js/init.js", ["js:init"]);
    gulp.watch("./src/img/**/*", ["image-min"]);
    gulp.watch("./static/css/above.css", ["html:above"]);
});

gulp.task("clean", function() {
    return del.sync(["public/**"]);
});

gulp.task("hugo", function() {
    return gulp.src('', {read: false})
        .pipe(shell(["hugo"]));
});

gulp.task("upload", function() {
    var c = require(p("private.js"));
    return gulp.src("public/**/*")
        .pipe(rsync(c.config));
});

gulp.task("build", function() {
    return runSequence([
        "hugo",
        "pre-build",
        "test",
        "post-build"
    ]);
});

gulp.task("deploy", function() {
    return runSequence(
        "build",
        "upload"
    );
});

gulp.task("default", ["build", "watch"]);
