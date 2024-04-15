const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "An user's name is required"],
        minlength: [10, "The user's name must be at least 10 characters long"]
    },
    email: {
        type: String,
        required: [true, "An user's email is required"]
    },
    password: {
        type: String,
        required: [true, "An user's password is required"]
    }
})

const User =  mongoose.model("User", UserSchema);
//Mongoose utiliza el mismo nombre del modelo, para asignar el nombre de la colección, pero utiliza la palabra
//en plural y en minúsculas. En este caso: User --> users

module.exports = {
    User
    //Student: Student
}

//Este Schema se utiliza para guardar el email y password de los users al momento de registrarse.