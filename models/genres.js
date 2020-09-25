const mongoose = require(`mongoose`);

const genreSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  postsIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: `posts`
  }]
});

const Genres = mongoose.model(`genres`, genreSchema);

module.exports = Genres;