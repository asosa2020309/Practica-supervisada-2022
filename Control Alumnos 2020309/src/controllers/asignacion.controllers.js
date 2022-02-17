const Asignaciones = require('../models/asignacion.models');

// aqui se agregara asignaciones
function agregarAsignaciones(req, res) {
    var parametros = req.body;
    var modeloAsignaciones = new Asignaciones();

    if (req.user.rol == 'alumno') {
        if (parametros.idCurso && parametros.idAlumno) {
            modeloAsignaciones.idCurso = req.user.sub;
            modeloAsignaciones.idAlumno = parametros.idAlumno;
            modeloAsignaciones.cAsignados + 1;

            if (parametros.cAsignados < 3){
                modeloAsignaciones.save((err, asgGu) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                    if (!asgGu) return res.status(500)
                            .send({ mensaje: 'Error al agregar asignacion' });
                    return res.status(200)
                            .send({ asignacion: asgGu });
                })
            }else{
                return res.status(500).send({ mensaje: 'Ya alcanzo el maximo de cursos'});
            }
        }else{
            return res.status(500).send({ mensaje: 'Faltan datos'});
        }

    } else {
        return res.status(500).send({ mensaje: 'Debe ingresar los parametros obligatorios' })
    }

}









// para encontrarAsignacion
function encontrarAsignaciones(req, res) {
    if (req.user.rol == 'maestro') {
        Cursos.find({}, (err, cursosEn) => {
            if (err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if (!cursosEn) return res.status(500)
                .send({ mensaje: 'Error al obtener las cursos' });
            return res.status(200)
                .send({ cursos: cursosEn });
        }).populate('idMaestro', 'nombres');
    }

}






// para editarAsignaciones
function editarAsignaciones(req, res) {
    var idCur = req.params.idCursos;
    var parametros = req.body;

    if (req.user.rol == 'maestro') {
        Cursos.findByIdAndUpdate(idCur, parametros, { new: true }, (err, cursosEd) => {
            if (err) return res.status(500)
                .send({ mensaje: 'Error en  la peticion' });
            if (!cursosEd) return res.status(403)
                .send({ mensaje: 'Error al editar el cursos' });
            return res.status(200)
                .send({ cursos: cursosEd });
        })
    } else {
        return res.status(500).send({ mensaje: 'No tiene los permisos' });
    }

}





// para eliminarAsignaciones
function eliminarAsignaciones(req, res) {
    var idCur = req.params.idCursos;

    Cursos.findByIdAndDelete(idCur, (err, cursoBo) => {
        if (err) return res.status(500)
            .send({ mensaje: 'Error en la peticion' });
        if (!cursoBo) return res.status(500)
            .send({ mensaje: 'Error al eliminar el curso' });
        return res.status(200).send({ curso: cursoBo });
    })
}

module.exports = {
    agregarAsignaciones,
    asignar,
    encontrarAsignaciones,
    editarAsignaciones,
    eliminarAsignaciones
}