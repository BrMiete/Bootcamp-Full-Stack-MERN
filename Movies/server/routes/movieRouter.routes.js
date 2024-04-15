const express = require('express');
const {
    createMovie,
    getAllMovies,
    getOneMovie,
    updateAMovie,
    deleteAMovie
} = require('../controllers/movie.controller');
const { verifyToken } = require('../utils/oauth.util');
const router = express.Router();

router.get("/", verifyToken, getAllMovies);
router.post("/new", verifyToken, createMovie);
router.put("/:id", verifyToken, updateAMovie);
router.delete("/delete/:id", verifyToken, deleteAMovie);
router.get("/:id", verifyToken, getOneMovie);

module.exports = {
    movieRouter: router
}