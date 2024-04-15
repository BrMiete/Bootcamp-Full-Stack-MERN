const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: [true, "A product name is required"],
        minlength: [3, "The setup must be at least 3 characters long"]
    },
    price: {
        type: Number,
        required: [true, "A product price is required"],
        min: [500, "The price must be at least 500 Gs."]
    },
    description: {
        type: String,
        required: [true, "A product description is required"],
        minlength: [5, "The setup must be at least 5 characters long"]
    }
})

const Product = mongoose.model("Product", ProductSchema);

module.exports = {Product};