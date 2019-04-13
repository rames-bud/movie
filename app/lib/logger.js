const logger = require('pino')();
const moment = require('moment');

const captureError = (errorMessage, errorOrigin, errorLevel) => {
  const currentTime = moment();

  const errorResponse = {
    timestamp: currentTime,
    errorMessage,
    errorOrigin,
    errorLevel
  };

  logger.error(errorResponse);
  return errorResponse;
};

const captureInfo = (message, origin, importance) => {
  const currentTime = moment();

  const infoMessage = {
    timestamp: currentTime,
    message,
    origin,
    level: importance
  };

  logger.info(infoMessage);
  return infoMessage;
};

module.exports = {
  error: captureError,
  info: captureInfo
};
