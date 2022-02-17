const express = require('express');
const cors = require('cors');
const app = express();


const usuariosRoutes = require('./src/routes/usuarios.routes');
const cursosRoutes = require('./src/routes/cursos.routes');
const asignacionesRoutes = require('./src/routes/asignacion.routes')

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors());
app.use('/api', cursosRoutes, usuariosRoutes, asignacionesRoutes);

module.exports = app;