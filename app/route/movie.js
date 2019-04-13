const auth = require('./../middleware/auth');
const movieController = require('./../controller/movie-controller');

const setRouter = (app) => {
  app.post('/addMovie', auth.isAuthorized, movieController.addMovie);
  app.get('/getMovie/all', auth.isAuthorized, movieController.getAllMovies);
  app.get('/getMovie/:movieId', auth.isAuthorized, movieController.getSingleMovie);
  app.put('/editMovie/:movieId', auth.isAuthorized, movieController.editMovie);
  app.post('/deleteMovie/:movieId', auth.isAuthorized, movieController.deleteMovie);
};

module.exports = { setRouter };
