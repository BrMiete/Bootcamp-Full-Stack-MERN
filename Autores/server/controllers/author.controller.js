const {Author} = require('../models/author.model');

module.exports.createAuthor = (request, response) => {
    Author.create(request.body)
        .then(newAuthor => response.json({author: newAuthor}))
        .catch(error => response.status(500).json({message: "Something went wrong while creating a new author", error: error}));
}

module.exports.getAllAuthors = (request, response) => {
    Author.find()
        .then(allAuthors => response.json({authors: allAuthors}))
        .catch(error => response.status(500).json({message: "Something went wrong while finding all authors", error: error}))
}

module.exports.getOneAuthor = (request, response) => {
    Author.findOne({_id: request.params.id})
        .then(oneAuthor => response.json({author: oneAuthor}))
        .catch(error => response.status(500).json({message: "Something went wrong while finding a single author", error: error}))
}

module.exports.updateAnAuthor = (request, response) => {
    Author.findOneAndUpdate({_id: request.params.id}, request.body, {runValidators: true, new: true})
        .then(updatedAuthor => response.json({author: updatedAuthor}))
        .catch(error => response.status(500).json({message: "Something went wrong while updating the author", error: error}))
}

module.exports.deleteAnAuthor = (request, response) => {
    Author.deleteOne({_id: request.params.id})
        .then(deletedAuthor => response.json({author: deletedAuthor}))
        .catch(error => response.status(500).json({message: "Something went wrong while deleting the author", error: error}))
}
