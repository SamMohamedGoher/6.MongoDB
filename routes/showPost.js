const express = require(`express`);
const router = express.Router();
const controller = require(`../controllers/posts`);

// GET: /showPost/:id
router.get(`/showPost/:id`, controller.getShowPost);

// POST: /showPost/:id
router.post(`/showPost/:id`, controller.postShowPost);

module.exports = router;