var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var components = {};
app.use(function(req, res, next) {
  req.components = components;
  if (Object.keys(components).length == 0) {
    fs.readdir('./components', function(err, files) {
      if (err) {
        console.error("Error reading components: " + err);
        next();
        return;
      }
      files.forEach(function(file, index) {
        if (file == "sample.js") {
          return;
        }
        var name = path.parse(file).name;
        components[name] =
          { fname: file,
            module: require(path.join(process.cwd(), 'components', file))
          };
      });
      next();
    });
  } else {
    next();
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
