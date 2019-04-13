const auth = require('./../middleware/auth');
const movieController = require('./../controller/movie-controller');

const setRouter = (app) => {
  const baseUrl = '/movie';
  app.post(`${baseUrl}/addMovie`, auth.isAuthorized, movieController.addMovie);
  app.get(`${baseUrl}/getMovie/all`, auth.isAuthorized, movieController.getAllMovies);
  app.get(`${baseUrl}/getMovie/:movieId`, auth.isAuthorized, movieController.getSingleMovie);
  app.put(`${baseUrl}/editMovie/:movieId`, auth.isAuthorized, movieController.editMovie);
  app.post(`${baseUrl}/deleteMovie/:movieId`, auth.isAuthorized, movieController.deleteMovie);
};

module.exports = { setRouter };
