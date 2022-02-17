const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    nombres: String,
    email: String,
    password: String,
    rol: String
})

module.exports = mongoose.model('Usuarios', usuariosSchema);