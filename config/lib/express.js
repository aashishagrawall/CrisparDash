'use strict';

//dependencies
var express = require("express");
var path  = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var logger = require('morgan');
var session=require('express-session');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var cookieParser = require('cookie-parser');

//routes
var indexRoute = require('../../routes/index.routes');



function initMiddleWares(app) {

  //init cors request
  app.use(cors());

  //init logger
  app.use(logger('dev'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(session({
    secret:'crispar',
    saveUninitialized:false,
    resave:false
  }))

  app.use(passport.initialize());
  app.use(passport.session());


 app.use(express.static(path.join(__dirname, '../../public')));

  app.use((err, req, res, next) => {
    if (err) {
      console.log('Invalid Request data');
      res.json({
        status : 1,
        message : 'Invalid Request data'
      });
    } else {
      next();
    }
  });

}





function initRoutes(app){
  indexRoute(app);
  
}



module.exports.init = function() {

 var app = express();

 //checkDb();
 initMiddleWares(app);
 initRoutes(app);

 return app;
}