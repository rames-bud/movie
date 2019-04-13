const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  movieId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  movieName: {
    type: String,
    default: ''
  },
  rating: {
    type: String,
    default: ''
  },
  releaseDate: {
    type: Date,
    default: ''
  },
  directors: {
    type: Array,
    default: ''
  },
  createdOn: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model('Movie', movieSchema);
