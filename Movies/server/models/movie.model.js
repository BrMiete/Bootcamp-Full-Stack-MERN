const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReviewModel = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        minlength: [3, "Your name must be at least 3 characters long"]
    },
    rating: {
        type: Number,
        required: [true, "The movie's rating is required"],
        min: [1, "The movie's rating is less than minimum allowed value (1)"],
        max: [5, "The movie's rating is more than maximum allowed value (5)"]
    },
    review: {
        type: String,
        required: [true, "The movie's review is required"],
        maxlength: [300, "The movie's review must be a maximum of 300 characters long"]
    }
})

const MovieSchema = new Schema({
    title: {
        type: String,
        required: [true, "A movie's title is required"],
        minlength: [3, "The movie's title must be at least 3 characters long"]
    },
    reviews: [ReviewModel]
})

const Movie = mongoose.model("Movie", MovieSchema); //("Collection_Name", Schema)
//Mongoose automatically looks for the plural, lowercased version of your model name.

module.exports = {Movie};