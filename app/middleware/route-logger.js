const { appConfig } = require('./../../config/app-config');

const requestIpLogger = (req, res, next) => {
  const remoteIp = `${req.connection.remoteAddress}://${req.connection.remotePort}`;
  console.log(`${req.method} Request Made from ${remoteIp} for route ${req.originalUrl}`);
  if (req.method === 'OPTIONS') {
    console.log('!OPTIONS');
    const headers = {};
    // headers["Access-Control-Allow-Origin"] = req.headers.origin;
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
    headers['Access-Control-Allow-Credentials'] = false;
    headers['Access-Control-Max-Age'] = '86400'; // 24 hours
    headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
    res.writeHead(200, headers);
    res.end();
  } else {
    res.header('Access-Control-Allow-Origin', appConfig.allowedCorsOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  }
};

module.exports = {
  logIp: requestIpLogger
};
