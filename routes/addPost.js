const express = require(`express`);
const router = express.Router();
const postsController = require(`../controllers/posts`);

// GET: /showGenre/:gid/addPost
router.get(`/showGenre/:gid/addPost`, postsController.getAddPost);

// POST: /showGenre/:gid/addPost
router.post(`/showGenre/:gid/addPost`, postsController.postAddPost);

module.exports = router;