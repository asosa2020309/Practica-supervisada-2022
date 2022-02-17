const express = require('express');
const controladorUsuarios = require('../controllers/usuarios.controllers');
const md_autenticacion = require('../middlewares/autenticacion')
const api = express.Router();

api.post('/registrarMaestro', controladorUsuarios.RegistrarMaestro);
api.post('/registrarAlumno', controladorUsuarios.RegistrarAlumno);
api.post('/login',md_autenticacion.Auth, controladorUsuarios.Login);
api.put('/editarUsuarios/:idUsuarios', md_autenticacion.Auth, controladorUsuarios.editarUsuarios);
api.delete('/eliminarUsuarios/:idUsuarios', md_autenticacion.Auth, controladorUsuarios.eliminarUsuarios);

module.exports = api;