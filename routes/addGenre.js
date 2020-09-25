const express = require(`express`);
const router = express.Router();
const genreController = require(`../controllers/genres`);

// GET: /addGenre
router.get(`/addGenre`, genreController.getAddGenre);

// POST: /addGenre
router.post(`/addGenre`, genreController.postAddGenre);

module.exports = router;