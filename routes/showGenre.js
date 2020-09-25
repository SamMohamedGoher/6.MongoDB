const express = require(`express`);
const router = express.Router();
const postsController = require(`../controllers/posts`);

// GET: /showGenre/:gid
router.get(`/showGenre/:gid`, postsController.getshowGenre);

// POST: /showGenre/:gid
router.post(`/showGenre/:gid`, postsController.postshowGenre);

module.exports = router;