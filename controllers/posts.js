const express = require(`express`);
const {connectDB, Post} = require(`../models/posts`);
const Genres = require(`../models/genres`);

// GET: /showGenre/:gid
exports.getshowGenre = async (req, res) => {
  const post = await Post.find({genreId: req.params.gid});
  const genre = await Genres.find({_id: req.params.gid});
  res.render(`showGenre`, {
    posts: post,
    genre: genre[0]
  });
}

// POST: /showGenre/:gid
exports.postshowGenre = async (req, res) => {
  await Post.findByIdAndRemove({_id: req.body.id});
  res.redirect(`/showGenre/${req.params.gid}`);
};

// GET: /showGenre/:gid/addPost
exports.getAddPost = async (req, res) => {
  const genre = await Genres.find({_id: req.params.gid});
  res.render(`addPost`, {
    genre: genre[0]
  });
  express.static(__dirname);
};

// POST: /showGenre/:gid/addPost
exports.postAddPost = async (req, res) => {
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
    console.error(`${error}`);
  }
};

// GET: /showPost/:id

exports.getShowPost = async (req, res) => {
  const post = await Post.find({_id: req.params.id}).populate(`genreId`);
  res.render(`showPost`, {
    post: post[0]
  });
};

// POST: /showPost/:id
exports.postShowPost = async (req, res) => {
  await Post.findByIdAndRemove({_id: req.body.id});
  res.redirect(`/`);
}

// GET: /editPost/:id
exports.getEditPost = async (req, res) => {
  const post = await Post.find({_id: req.params.id});
  const currentGenre = await Genres.find({_id: post[0].genreId});
  res.render(`editPost`, {
    post: post[0],
    genre: currentGenre[0]
  });
};

// POST: /editPost/:id
exports.postEditPost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate({_id: req.params.id}, {
      title: req.body.title,
      description: req.body.description
    })
    res.redirect(`/showPost/${req.params.id}`);
  } catch (error) {
    console.error(error);
  }
}