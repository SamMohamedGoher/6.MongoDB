const mongoose = require("mongoose");
const Genres = require(`../models/genres`);
const {connectDB, Post} = require(`../models/posts`);

// GET: /
exports.getHome = async (req, res, next) => {
  try {
    
    const genres = await Genres.find();
    res.render(`home`, {
      genres: genres
    });

  } catch (error) {
    next(error);
  }
};

// POST: /
exports.postHome = async (req, res, next) => {

  try {
    
    const genre = await Genres.find({_id: req.body.id});
    const postsIds = genre[0].postsIds;
    if(postsIds[0]){
      for(let i = 0;i<postsIds.length;i++){
        await Post.findByIdAndRemove({_id: postsIds[i]});
      }
      await Genres.findByIdAndRemove({_id: req.body.id});
    } else {
      await Genres.findByIdAndRemove({_id: req.body.id});
    }
    res.redirect(`/`);

  } catch (error) {
    next(error);
  }
};

// GET: /addGenre
exports.getAddGenre = (req, res, next) => {
  try {
    
    res.render(`addGenre`);

  } catch (error) {
    next(error);
  }
};

// POST: /addGenre
exports.postAddGenre = async (req, res, next) => {
  try {
    const newGenre = new Genres({
      name: req.body.name,
      imageUrl: req.body.imageUrl
    });
    await newGenre.save();
    res.redirect(`/`);

  } catch (error) {
    next(error);
  }
};

// GET: /getEditGenre/:gid
exports.getEditGenre = async (req, res, next) => {
  try {
    
    const currentGenre = await Genres.find({_id: req.params.gid});
    res.render(`editGenre`, {
      genre: currentGenre[0]
    });

  } catch (error) {
    next(error);
  }
};

// POST: /getEditGenre/:gid
exports.postEditGenre = async (req, res, next) => {
  try {
    
    const currentGenre = await Genres.findById(req.params.gid);
    currentGenre.name = req.body.name;
    currentGenre.imageUrl = req.body.imageUrl;
    await currentGenre.save();
    res.redirect(`/`);

  } catch (error) {
    next(error);
  }
};