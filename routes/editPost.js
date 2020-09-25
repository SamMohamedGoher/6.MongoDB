const express = require(`express`);
const router = express.Router();
const postsController = require(`../controllers/posts`);

// GET: /editPost/:id
router.get(`/editPost/:id`, postsController.getEditPost);

// POST: /editPost/:id
router.post(`/editPost/:id`, postsController.postEditPost);

module.exports = router;