const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "An user's first name is required"],
        minlength: [3, "The user's first name must be at least 3 characters long"] //puse 5 caracteres en vez de 10
    },
    lastName: {
        type: String,
        required: [true, "An user's last name is required"],
        minlength: [3, "The user's last name must be at least 3 characters long"]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "An user's email is required"]
    },
    password: {
        type: String,
        required: [true, "An user's password is required"],
        minlength: [8, "The user's last name must be at least 8 characters long"]
    }
})

const User =  mongoose.model("User", UserSchema);
//Mongoose utiliza el mismo nombre del modelo, para asignar el nombre de la colección, pero utiliza la palabra
//en plural y en minúsculas. En este caso: User --> users

module.exports = {
    User
    //Student: Student
}