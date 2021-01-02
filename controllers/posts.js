const express = require(`express`);
const { Post } = require(`../models/posts`);
const Genres = require(`../models/genres`);

// GET: /showGenre/:gid
exports.getshowGenre = async (req, res, next) => {
  try {

    const post = await Post.find({genreId: req.params.gid});
    const genre = await Genres.find({_id: req.params.gid});
    res.render(`showGenre`, {
      posts: post,
      genre: genre[0]
    });
    
  } catch (error) {
    next(error);
  }
}

// POST: /showGenre/:gid
exports.postshowGenre = async (req, res, next) => {
  try {
    
    await Post.findByIdAndRemove({_id: req.body.id});
    res.redirect(`/showGenre/${req.params.gid}`);

  } catch (error) {
    next(error);
  }
};

// GET: /showGenre/:gid/addPost
exports.getAddPost = async (req, res, next) => {
  try {
    
    const genre = await Genres.find({_id: req.params.gid});
    res.render(`addPost`, {
      genre: genre[0]
    });
    express.static(__dirname);

  } catch (error) {
    next(error);
  }
};

// POST: /showGenre/:gid/addPost
exports.postAddPost = async (req, res, next) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      genreId: req.body.genreId
    });
    await newPost.save();
    const genre = await Genres.find({_id: req.params.gid});
    const postsIds = genre[0].postsIds;
    postsIds.push(newPost._id);
    await Genres.findByIdAndUpdate(req.params.gid, {
      postsIds: postsIds
    });
    res.redirect(`/showGenre/${req.params.gid}`);

  } catch (error) {
    next(error);
  }
};

// GET: /showPost/:id

exports.getShowPost = async (req, res, next) => {
  try {

    const post = await Post.find({_id: req.params.id}).populate(`genreId`);
    res.render(`showPost`, {
      post: post[0]
    });
    
  } catch (error) {
    next(error);
  }
};

// POST: /showPost/:id
exports.postShowPost = async (req, res, next) => {
  try {
    
    await Post.findByIdAndRemove({_id: req.body.id});
    res.redirect(`/`);

  } catch (error) {
    next(error);
  }
}

// GET: /editPost/:id
exports.getEditPost = async (req, res, next) => {
  try {
    
    const post = await Post.find({_id: req.params.id});
    const currentGenre = await Genres.find({_id: post[0].genreId});
    res.render(`editPost`, {
      post: post[0],
      genre: currentGenre[0]
    });

  } catch (error) {
    next(error);
  }
};

// POST: /editPost/:id
exports.postEditPost = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate({_id: req.params.id}, {
      title: req.body.title,
      description: req.body.description
    })
    res.redirect(`/showPost/${req.params.id}`);
  } catch (error) {
    next(error);
  }
}