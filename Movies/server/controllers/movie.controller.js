const {Movie} = require('../models/movie.model');

module.exports.createMovie = (request, response) => {
    Movie.create(request.body)
        .then(newMovie => response.json({movie: newMovie}))
        .catch(error => response.status(500).json({message: "Something went wrong while creating a new movie", error: error}));
}

module.exports.getAllMovies = (request, response) => {
    Movie.find()
        .then(allMovies => response.json({movies: allMovies}))
        .catch(error => response.status(500).json({message: "Something went wrong while finding all movies", error: error}))
}

module.exports.getOneMovie = (request, response) => {
    Movie.findOne({_id: request.params.id})
        .then(oneMovie => response.json({movie: oneMovie}))
        .catch(error => response.status(500).json({message: "Something went wrong while finding a single movie", error: error}))
}

module.exports.updateAMovie = (request, response) => {
    Movie.findOneAndUpdate({_id: request.params.id}, request.body, {runValidators: true, new: true})
        .then(updatedMovie => response.json({movie: updatedMovie}))
        .catch(error => response.status(500).json({message: "Something went wrong while updating the movie", error: error}))
}

module.exports.deleteAMovie = (request, response) => {
    Movie.deleteOne({_id: request.params.id})
        .then(deletedMovie => response.json({movie: deletedMovie}))
        .catch(error => response.status(500).json({message: "Something went wrong while deleting the movie", error: error}))
}