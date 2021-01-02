const mongoose = require(`mongoose`);

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `please add a name`]
  },
  imageUrl: {
    type: String,
    required: [true, `please add an url of image`]
  },
  postsIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: `posts`
  }]
});

const Genres = mongoose.model(`genres`, genreSchema);

module.exports = Genres;