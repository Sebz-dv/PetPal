const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definición del esquema de usuario
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Definición del modelo basado en el esquema
module.exports = mongoose.model('User', userSchema);
