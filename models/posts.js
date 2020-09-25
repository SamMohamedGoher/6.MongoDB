const mongoose = require(`mongoose`);

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://sam12345:sam12345@cluster0-sft7v.mongodb.net/mongoTest?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
      .then(console.log(`Connected to MongoDB...`))
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  genreId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: `genres`,
    required: true
  }
});

const Post = mongoose.model(`posts`, postSchema);

module.exports = {connectDB, Post};