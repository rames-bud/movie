const response = require('./../lib/response');
const logger = require('./../lib/logger');
const { appConfig } = require('../../config/app-config');

const generateToken = () => Buffer.from(appConfig.authToken).toString('base64');
console.log('line6', generateToken());
const isAuthorized = (req, res, next) => {
  if (req.header('authToken') && req.header('authToken') === generateToken()) {
    next();
  } else {
    logger.error('AuthorizationToken Missing', 'AuthorizationMiddleware', 5);
    const apiResponse = response.generate(true, 'AuthorizationToken Is Missing In Request', 400, null);
    res.send(apiResponse);
  }
};
module.exports = { isAuthorized };
