"use strict";
require('module-alias/register');

const empty = require('is-empty'),
    hash = require('bcrypt');

const { entorno } = require('@confi/yargs'),
    { CICLOS } = require('@confi')[entorno];

module.exports = (req, res, next) => {
    const { password } = req.body;
    if(empty(password))
        return res.status(400).json({ "estatus" : false, "res": `Contraseña no encontrada` }).end();

    req.body.password = hash.hashSync(password, CICLOS);

    return next();
};