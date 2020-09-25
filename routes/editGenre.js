const express = require(`express`);
const router = express.Router();
const genresController = require(`../controllers/genres`);

// GET: /editGenre/:gid
router.get(`/editGenre/:gid`, genresController.getEditGenre);

// POST: /editGenre/:gid
router.post(`/editGenre/:gid`, genresController.postEditGenre);

module.exports = router;