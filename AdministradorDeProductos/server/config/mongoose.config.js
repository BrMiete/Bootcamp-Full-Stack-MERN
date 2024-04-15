const mongoose = require('mongoose');

module.exports = {
    configureDB: () => {
        mongoose.connect("mongodb://localhost/ProductDB")
        console.log(mongoose.connection.readyState)
    }
}