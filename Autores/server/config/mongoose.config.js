const mongoose = require('mongoose');

module.exports = {
    configureDB: () => {
        mongoose.connect("mongodb://localhost/AuthorsDB") //Aquí se cambia el nombre de la Base de Datos.
            .then(() => console.log("Established a connection to the database"))
            .catch((err) => console.log("Something went wrong when connecting to the database", err));
            //console.log(mongoose.connection.readyState)
    }
}