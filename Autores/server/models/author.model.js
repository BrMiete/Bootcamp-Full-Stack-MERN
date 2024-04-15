const mongoose = require('mongoose');
const {Schema} = mongoose;

const AuthorSchema = new Schema({
    name: {
        type: String,
        required: [true, "An author's name is required"],
        minlength: [3, "The author's name must be at least 3 characters long"]
    }
})

const Author = mongoose.model("Author", AuthorSchema); //("Collection_Name", Schema)
//Mongoose automatically looks for the plural, lowercased version of your model name.
//Mongoose utiliza el mismo nombre del modelo, para asignar el nombre de la colección, pero utiliza la palabra
//en plural y en minúsculas. En este caso: Author --> authors

module.exports = {Author};