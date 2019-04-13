const appConfig = {
  port: 3000,
  allowedCorsOrigin: '*',
  authToken: 'securemovie',
  db: {
    uri: 'mongodb+srv://navomi:navomi@cluster0-hvrkt.mongodb.net/test?retryWrites=true'
    // comment the above uri and use the below uri for testing locally
    // uri: 'mongodb://127.0.0.1:27017/movieApp'
  },
  apiVersion: '1.0.0'
};

module.exports = { appConfig };
