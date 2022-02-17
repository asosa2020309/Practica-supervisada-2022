const express = require('express');
const controladorCursos = require('../controllers/cursos.controllers');
const md_Autenticacion = require('../middlewares/autenticacion');
const api = express.Router();

api.post('/agregarCursos', md_Autenticacion.Auth, controladorCursos.agregarCursos);
api.get('/obtenerCursos', md_Autenticacion.Auth, controladorCursos.encontrarCursos);
api.put('/editarCursos/:idCursos', md_Autenticacion.Auth, controladorCursos.editarCursos);
api.delete('/eliminarCursos/:idCursos', md_Autenticacion.Auth, controladorCursos.eliminarCursos);

module.exports = api;