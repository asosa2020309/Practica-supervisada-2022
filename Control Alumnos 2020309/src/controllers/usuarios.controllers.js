const Usuarios = require('../models/usuarios.models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt'); 

// aqui empieza el registrar
function RegistrarMaestro(req, res) {
    var parametros = req.body;
    var modeloUsuarios = new Usuarios();

        if(parametros.nombres && parametros.email && parametros.password) {
            Usuarios.find({ email : parametros.email }, (err, usuariosEncontrados) => {
                if ( usuariosEncontrados.length > 0 ){ 
                    return res.status(500)
                        .send({ mensaje: "Este correo ya se encuentra en uso" })
                } else {
                    modeloUsuarios.nombres = parametros.nombres;
                    modeloUsuarios.email = parametros.email;
                    modeloUsuarios.password = '123456';
                    modeloUsuarios.rol = 'maestro';

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        modeloUsuarios.password = passwordEncriptada;

                        modeloUsuarios.save((err, usuariosGuardados)=>{
                            if(err) return res.status(500)
                                        .send({ mensaje : 'Error en la peticion' })
                            if(!usuariosGuardados) return res.status(500)
                                        .send({ mensaje: 'Error al guardar el Usuario' })
    
                            return res.status(200).send({usuarios: usuariosGuardados})
                        })
                    })                    
                }
            })
    } else {
        return res.status(404)
            .send({ mensaje : 'Debe ingresar los parametros obligatorios'})
    }

}








// para registrarAlumnos
function RegistrarAlumno(req, res) {
    var parametros = req.body;
    var modeloUsuarios = new Usuarios();

        if(parametros.nombres && parametros.email && parametros.password) {
                Usuarios.find({ email : parametros.email }, (err, usuariosEncontrados) => {
                    if ( usuariosEncontrados.length > 0 ){ 
                        return res.status(500)
                                        .send({ mensaje: "Este correo ya se encuentra utilizado" })
                    } else {
                        modeloUsuarios.nombres = parametros.nombres;
                        modeloUsuarios.password = parametros.password;
                        modeloUsuarios.email = parametros.email;
                        modeloUsuarios.rol = 'alumno';
    
                        bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                            modeloUsuarios.password = passwordEncriptada;
    
                            modeloUsuarios.save((err, usuariosGuardado) => {
                                if(err) return res.status(500)
                                        .send({ mensaje : 'Error en la peticion' })
                                if(!usuariosGuardado) return res.status(500)
                                        .send({ mensaje: 'Error al guardar el Usuario' })
        
                                return res.status(200).send({ usuario: usuariosGuardado})
                            })
                        })                    
                    }
                })
        } else {
            return res.status(404).send({ mensaje : 'Debe ingresar los parametros obligatorios'})
        }
}





// para login
function Login(req, res) {
    var parametros = req.body;

    Usuarios.findOne({ email : parametros.email }, (err, usuariosEncontrado) => {
        if(err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion'});
        if (usuariosEncontrado){

            bcrypt.compare(parametros.password, usuariosEncontrado.password, (err, verificacionPassword) => {
                    if (verificacionPassword) {
                        return res.status(200)
                                .send({ token: jwt.crearToken(usuariosEncontrado) })
                    } else {
                        return res.status(500)
                                .send({ mensaje: 'La contrasena no coincide'})
                    }
                })
        } else {
            return res.status(500)
                                .send({ mensaje: 'El usuario, no se ha podido identificar'})
        }
    })
}






// para editarUsuarios
function editarUsuarios(req, res) {
    var idUs = req.params.idUsuarios;
    var parametros = req.body;

    delete parametros.password; 
            if(req.user.sub == !idUs) {
                return res.status(500)
                                .send({message:'No tiene permisos para editar este usuario'});
            } 
            Usuarios.findByIdAndUpdate(req.user.sub, parametros, {new:true}, (err, usuariosEd) =>  {
                if (err) return res.status(500)
                                .send({ mensaje: 'Error en  la peticion'});
              
                if (!usuariosEd) return res.status(500)
                                .send({mensaje: 'Error al editar el usuario'});

                return res.status(200).send({usuarios: usuariosEd});
            })
    } 







// para eliminar
function eliminarUsuarios(req, res) {
    var idUs = req.params.idUsuarios;

        Usuarios.findByIdAndDelete(idUs, (err, usuariosEl)=>{
            if(err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
            if(!usuariosEl) return res.status(500)
                                .send({ mensaje: 'Error al eliminar el usuario' })
    
            return res.status(200).send({ usuarios: usuariosEl });
        })
    }

module.exports = {
    RegistrarMaestro,
    RegistrarAlumno,
    Login,
    editarUsuarios,
    eliminarUsuarios
}