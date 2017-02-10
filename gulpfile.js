const gulp = require('gulp');
const babel = require("gulp-babel");
const concat = require('gulp-concat');
const minifyCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const awsBeanstalk = require("node-aws-beanstalk");
const newer = require("gulp-newer");
const del = require("del");
const less = require('gulp-less');
const path = require('path');
const coffee = require('gulp-coffee');
const minify = require('gulp-minify');
const bump = require('gulp-bump');
const webpack = require('webpack-stream');
const zip = require('gulp-zip');
const fs = require("fs");
const sass = require("gulp-sass");
const argv = require("yargs").argv;
const process = require("process");

gulp.task("jsx",function(){
  const indir = "./src/js/*.jsx";
  const outdir = "./obj";
  const opts = {
    plugins: [
      'transform-react-jsx'
    ],
    presets: [
      "es2015"
    ]
  };
  return gulp.
    src(indir).
    pipe(newer("./obj")).
    pipe(babel(opts)).
    pipe(gulp.dest(outdir));
});

gulp.task("coffee",function(){
  const indir = "./src/js/*.coffee";
  const outdir = "./obj";
  const opts = {};
  return gulp.
    src(indir).
    pipe(newer("./obj")).
    pipe(coffee(opts)).
    pipe(gulp.dest(outdir));
});

gulp.task("js",["jsx","coffee"],function(){
  const opts = {};
  const webpack_opts = require("./webpack");
  return gulp.
    src(["./obj/*.js","./src/js/*.js"]).
    pipe(gulp.dest("./dist/js")).
    pipe(webpack(webpack_opts)).
    pipe(minify({
      ext:{
        min:".min.js"
      }
    })).
    pipe(gulp.dest("./dist/js"));
});

gulp.task("less",function(){
  const indir = "./src/css/*.less";
  const outdir = "./obj";
  const opts = {
    paths: [ path.join(__dirname, 'css', 'includes') ]
  };
  return gulp.
    src(indir).
    pipe(newer("./obj")).
    pipe(less(opts)).
    pipe(gulp.dest(outdir));
});

gulp.task("scss",function(){
  const indir = "./src/css/*.scss";
  const outdir = "./obj";
  const opts = {};
  return gulp.
    src(indir).
    pipe(newer("./obj")).
    pipe(sass().on("error", sass.logError)).
    pipe(gulp.dest(outdir));
});

gulp.task("css",["less","scss"],function(){
  return gulp.
    src(["./obj/*.css","./src/css/*.css"]).
    pipe(autoprefixer("last 2 version","safari 5","ie 8","ie 9")).
    pipe(concat("style.min.css")).
    pipe(minifyCSS({
      compatibility: "ie8"
    })).
    pipe(gulp.dest("./dist/css"));
});

gulp.task("clean",function(){
  return del(["./obj/*","./dist","./dist.zip","./temp.js"]);
});

gulp.task('dev', ["js","css"], function() {
  del(["dist/temp.js"]);
  return gulp.src([
    "src/*.jsx",
    "src/*.html",
    "src/*.js",
    "src/*.json",
    "src/*.pug",
    "bin/**/*"
  ]).pipe(gulp.dest("./dist"));
});

gulp.task("zip",["dev"],function(){
  del([
    "dist/temp.js",
    "dist/bundle.js"
  ]);
  var package_info = JSON.parse(fs.readFileSync("./package.json"));
  return gulp.
    src(["dist/**/*",'dist/*"']).
    pipe(zip(package_info["version"] + ".zip")).
    pipe(gulp.dest("./"));
});

gulp.task("increment_version",function(){
  return gulp.
    src('./package.json').
    pipe(bump({key: "version"})).
    pipe(gulp.dest('./'));
});

gulp.task('build',["increment_version","dev"],function(){
});

gulp.task("deploy",["clean","build","zip"],function(){
  // deploy to aws
  // to-do
});
