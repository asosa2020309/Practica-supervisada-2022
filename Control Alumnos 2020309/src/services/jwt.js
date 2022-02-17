const jwt_simple = require('jwt-simple');
const moment = require('moment');
const claveSecreta = "soyunmainyoru"

exports.crearToken = function (usuarios) {
    let payload = {
        sub: usuarios._id,
        email: usuarios.email,
        password: usuarios.password,
        rol: usuarios.rol,
        iat: moment().unix(),
        exp: moment().day(7, 'days').unix()
            
    }
    
    return jwt_simple.encode(payload, claveSecreta);    

}