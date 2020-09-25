const express = require(`express`);
const router = express.Router();
const genreController = require(`../controllers/genres`);

// GET: /
router.get(`/`, genreController.getHome);

// POST: /
router.post(`/`, genreController.postHome);

module.exports = router;