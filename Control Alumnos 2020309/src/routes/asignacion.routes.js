const express = require('express');
const asignacionCursos = require('../controllers/asignacion.controllers');
const md_Autenticacion = require('../middlewares/autenticacion');
const api = express.Router();

api.post('/agregarAsignaciones', md_Autenticacion.Auth, asignacionCursos.agregarAsignaciones);
api.get('/obtenerAsignaciones', md_Autenticacion.Auth, asignacionCursos.encontrarAsignaciones);
api.put('/editarAsignaciones/:idAsignaciones', md_Autenticacion.Auth, asignacionCursos.editarAsignaciones);
api.delete('/eliminarAsignaciones/:idAsignaciones', md_Autenticacion.Auth, asignacionCursos.eliminarAsignaciones);

module.exports = api;