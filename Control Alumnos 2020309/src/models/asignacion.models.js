const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asigSchema = new Schema({
    idCurso: { type: Schema.Types.ObjectId, ref: 'Cursos' },
    idAlumno: { type: Schema.Types.ObjectId, ref: 'Usuarios' },
    cAsignados: Number
})

module.exports = mongoose.model('Asignaciones', asigSchema);