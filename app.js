var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var responsesRouter = require('./routes/responses');

async function setupRouter() {
  try{
    var app = express();

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use('/responses', await responsesRouter());

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404))
    });

    // error handler
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json(err);
    });

    console.log('finish setting up app');

    return app;
  }catch(err){
    console.log('error in app.js', err);
  }

}
module.exports = setupRouter;