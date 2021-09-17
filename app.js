// Servidor web
var express = require('express');
// Esto para obener lo que esta en el directorio
var path = require('path');
var cookieParser = require('cookie-parser');
//registro de eventos, info, warnings, dangers
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// locahost:3000/
app.use('/', indexRouter);

// localhost:3000/users
app.use('/users', usersRouter);

module.exports = app;
