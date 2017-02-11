require('babel-register')({
    presets: ['es2015', 'react']
});
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var esgz = require("express-static-gzip");
var router = require("./serverrouter.jsx");

var env = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'test';
app.set('port', (process.env.PORT || 3000));
app.set("views",__dirname);
var staticRoot = __dirname + '/';

app.set("view engine","pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/static",esgz(staticRoot));

app.get("/",function(req,res){
  res.redirect("/home")
});

app.use("/",router);

app.listen(app.get('port'), function () {
  console.log('app running on port', app.get('port'));
});
