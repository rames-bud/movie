const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../lib/time');
const response = require('./../lib/response');
const check = require('../lib/check-empty');

const MovieModel = mongoose.model('Movie');

const addMovie = (req, res) => {
  let apiResponse = {};
  if (!req.body) {
    apiResponse = response.generate(true, 'No information passed in the request', 500, null);
    res.send(apiResponse);
  } else {
    const newMovie = new MovieModel({
      movieId: shortid.generate(),
      movieName: req.body.movieName,
      rating: req.body.rating,
      releaseDate: req.body.releaseDate,
      directors: req.body.directors,
      createdAt: time.now()
    });
    newMovie.save((err, result) => {
      delete result.__v;
      delete result._id;
      if (err) {
        apiResponse = response.generate(true, 'Error occurred while saving the movie', 500, null);
        res.send(apiResponse);
      } else if (check.isEmpty(result)) {
        apiResponse = response.generate(true, 'No result found', 404, null);
        res.send(apiResponse);
      } else {
        delete result.__v;
        delete result._id;
        apiResponse = response.generate(false, 'Movie added successfully', 200, result);
        res.send(apiResponse);
      }
    });
  }
};

const getAllMovies = (req, res) => {
  MovieModel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
      let apiResponse = {};
      if (err) {
        apiResponse = response.generate(true, 'Error occurred while finding movies', 500, null);
        res.send(apiResponse);
      } else if (check.isEmpty(result)) {
        apiResponse = response.generate(true, 'Movies not found', 404, null);
        res.send(apiResponse);
      } else {
        apiResponse = response.generate(false, 'Movies found', 200, result);
        res.send(apiResponse);
      }
    });
};

const getSingleMovie = (req, res) => {
  MovieModel.find({
    movieId: req.params.movieId
  })
    .select('-__v -_id -movieId')
    .lean()
    .exec((err, result) => {
      let apiResponse = {};
      if (err) {
        apiResponse = response.generate(true, 'Error occurred while finding movie', 500, null);
        res.send(apiResponse);
      } else if (check.isEmpty(result)) {
        apiResponse = response.generate(true, 'Movie not Found', 404, null);
        res.send(apiResponse);
      } else {
        apiResponse = response.generate(false, 'Movie details Found', 200, result);
        res.send(apiResponse);
      }
    });
};


const editMovie = (req, res) => {
  const options = req.body;
  MovieModel.update({
    movieId: req.params.movieId
  }, options, {
    multi: true
  })
    .exec((err, result) => {
      let apiResponse = {};
      console.log(result);
      if (err) {
        apiResponse = response.generate(true, 'Error occurred while updating', 500, null);
        res.send(apiResponse);
      } else if (check.isEmpty(result) || result.nModified === 0) {
        apiResponse = response.generate(true, 'No movie Found', null);
        res.send(apiResponse);
      } else {
        apiResponse = response.generate(false, 'Movie successfully updated', 200, result);
        res.send(apiResponse);
      }
    });
};

const deleteMovie = (req, res) => {
  MovieModel.deleteOne({
    movieId: req.params.movieId
  })
    .exec((err, result) => {
      let apiResponse = {};
      if (err) {
        apiResponse = response.generate(true, 'Error while deleting', 500, null);
      } else if (result.n === 0) {
        apiResponse = response.generate(true, 'No movie found', 404, null);
      } else {
        apiResponse = response.generate(false, 'Movie deleted successfully', 200, result);
      }
      res.send(apiResponse);
    });
};

module.exports = {
  addMovie,
  getAllMovies,
  getSingleMovie,
  editMovie,
  deleteMovie
};
