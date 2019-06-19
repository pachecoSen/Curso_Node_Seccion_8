"use strict";

const valida = require('./valida_mid');
const { setData:loginMid } = require('./loggin_mid'),
    { setData:usuarioMid } = require('./usuario_mid');

module.exports = app => {
    app.use('/sys', valida);
    app.use('/loggin', loginMid);
    app.use('/sys/user/', usuarioMid);
};