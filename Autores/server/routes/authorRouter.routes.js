const express = require('express');
const {
    createAuthor,
    getAllAuthors,
    getOneAuthor,
    updateAnAuthor,
    deleteAnAuthor
} = require('../controllers/author.controller');
const { verifyToken } = require('../utils/oauth.util');
const router = express.Router();

//Debe ir verifyToken en todos?
router.get("/", verifyToken, getAllAuthors);
router.post("/new", createAuthor);
router.put("/edit/:id", updateAnAuthor);
router.delete("/delete/:id", deleteAnAuthor);
router.get("/:id", getOneAuthor);

module.exports = {
    authorRouter: router
}