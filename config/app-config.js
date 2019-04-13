const appConfig = {
  port: 3000,
  allowedCorsOrigin: '*',
  authToken: 'securemovie',
  db: {
    uri: 'mongodb://127.0.0.1:27017/movieApp'
  },
  apiVersion: '1.0.0'
};

module.exports = { appConfig };
