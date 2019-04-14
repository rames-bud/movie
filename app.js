/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/global-require */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const helmet = require('helmet');
const http = require('http');
const cors = require('cors');

const app = express();
const { appConfig } = require('./config/app-config');
const logger = require('./app/lib/logger.js');
const routeLoggerMiddleware = require('./app/middleware/route-logger');
const globalErrorMiddleware = require('./app/middleware/error-handler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routeLoggerMiddleware.logIp);
app.use(globalErrorMiddleware.globalErrorHandler);
app.use(helmet());
app.use(cors());

app.use(express.static(path.join(__dirname, 'client')));


const modelPath = './app/model';
const routePath = './app/route';

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});


fs.readdirSync(modelPath).forEach((file) => {
  if (file.indexOf('.js')) {
    require(`${modelPath}/${file}`); // eslint-disable-line global-require
  }
});

fs.readdirSync(routePath).forEach((file) => {
  if (file.indexOf('.js')) {
    // eslint-disable-line import/no-dynamic-require
    const route = require(`${routePath}/${file}`); // eslint-disable-line global-require
    route.setRouter(app);
  }
});

// calling global 404 handler after route
app.use(globalErrorMiddleware.globalNotFoundHandler);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    logger.error(`${error.code} not equal listen`, 'serverOnErrorHandler', 10);
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${error.code}: elevated privileges required`, 'serverOnErrorHandler', 10);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${error.code}: port is already in use.`, 'serverOnErrorHandler', 10);
      process.exit(1);
      break;
    default:
      logger.error(`${error.code}: some unknown error occurred`, 'serverOnErrorHandler', 10);
      throw error;
  }
}


/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * database connection settings
 */
mongoose.connection.on('error', (err) => {
  logger.error(err, 'mongoose connection error', 10);
});

mongoose.connection.on('open', (err) => {
  if (err) {
    logger.error(`database error: ${err}`, 'mongoose connection open handler', 10);
  } else {
    console.log('database connection opened successfully');
  }
});

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  console.log(`Server started on http://localhost:${server.address().port}`);
  console.log(appConfig);
  mongoose.connect(appConfig.db.uri, { useNewUrlParser: true, useCreateIndex: true });
}

server.listen(appConfig.port);
server.on('error', onError);
server.on('listening', onListening);

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});


module.exports = app;
