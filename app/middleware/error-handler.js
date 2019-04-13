const response = require('./../lib/response');

const errorHandler = (err, req, res, next) => {
  console.error(`application error handler called: ${err}`);
  const apiResponse = response.generate(true, 'Some error occurred at global level', 500, null);
  res.send(apiResponse);
};

const notFoundHandler = (req, res, next) => {
  console.log('Global not found handler called');
  const apiResponse = response.generate(true, 'Route not found in the application', 404, null);
  res.status(404).send(apiResponse);
};

module.exports = {
  globalErrorHandler: errorHandler,
  globalNotFoundHandler: notFoundHandler
};
