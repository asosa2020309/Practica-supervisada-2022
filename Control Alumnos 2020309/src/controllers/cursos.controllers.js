const Cursos = require('../models/cursos.models');
const Asignacion = require('../models/asignacion.models');

//aqui inicia apra agregar cursos
function agregarCursos(req, res) {
    var parametros = req.body;
    var modeloCursos = new Cursos();

    if (req.user.rol == 'maestro') {
        if (parametros.nombre) {
            modeloCursos.nombre = parametros.nombre;
            modeloCursos.idMaestro = req.user.sub;

            modeloCursos.save((err, cursoGuardado) => {
                if (err) return res.status(500)
                        .send({ mensaje: 'Error en la peticion' });
                if (!cursoGuardado) return res
                        .status(500).send({ mensaje: 'Error al agregar curso' });

                return res.status(200)
                        .send({ cursos: cursoGuardado });
            })
        }
    } else {
        return res.status(500)
                        .send({ mensaje: 'Debe ingresar los parametros obligatorios' })
    }

}







//para encontrarCursos
function encontrarCursos(req, res) {
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









//editarCursos
function editarCursos(req, res) {
    var idCur = req.params.idCursos;
    var parametros = req.body;

    if (req.user.rol == 'maestro') {
        Cursos.findByIdAndUpdate(idCur, parametros, { new: true }, (err, cursosEd) => {
            if (err) return res.status(500)
                        .send({ mensaje: 'Error en  la peticion' });
            if (!cursosEd) return res.status(403)
                        .send({ mensaje: 'Error al editar el cursos' });
            return res.status(200).send({ cursos: cursosEd });
        })
    } else {
        return res.status(500)
                        .send({ mensaje: 'No tiene los permisos' });
    }

}









// para eliminarCursos
function eliminarCursos(req, res) {
    var idCur = req.params.idCursos;
    var asg = new Asignacion();

    asg.idCurso = '620dc5715c0209de7b6ac117'
    asg.idMaestro = '620dc5dd5c0209de7b6ac119';

    asg.save((err, cursoE) => {
        if (err) return res.status(500)
                    .send({ mensaje: 'Error en la peticion' });
        if (!cursoE) return res.status(500)
                    .send({ mensaje: 'Error al agregar curso' });
         
        else {
            Cursos.findByIdAndDelete(idCur, (err, cursoBo) => {
                if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                if (!cursoBo) return res.status(500)
                                .send({ mensaje: 'Error al eliminar el curso' });
                else{
                    Asignacion.find({idCurso: idCur}, (err, cursos) =>{
                        if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                        if (!cursos) return res.status(500)
                                .send({ mensaje: 'Error al eliminar el curso'})

                        else {
                            cursos.forEach(element => {
                                Asignacion.findByIdAndDelete(element._id, (err, asignacionBo) =>{
                                if (err) return res.status(500)
                                        .send({ mensaje: 'Error en la peticion' });
                                if (!asignacionBo) return res.status(500)
                                        .send({ mensaje: 'Error al eliminar el curso'})
                                })
                            });
                        } return res.status(200).send({ mensaje: 'Eliminado Correctamente'});
                        
                    })
                }
            })
        }
    })

    
}

module.exports = {
    agregarCursos,
    encontrarCursos,
    editarCursos,
    eliminarCursos
}