"use strict";

const valida = require('./valida_mid'),
    val_rol = require('./rol_mid');
const { setData:loginMid } = require('./loggin_mid'),
    { setData:usuarioMid } = require('./usuario_mid');

module.exports = app => {
    app.use('/sys', valida, val_rol);
    app.use('/loggin', loginMid);
    app.use('/sys/user/', usuarioMid);
};