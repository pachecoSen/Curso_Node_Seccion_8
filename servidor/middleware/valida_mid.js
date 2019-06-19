"use strict";
require('module-alias/register');

const empty = require('is-empty');

const Jwt = new require('@basehelping/jwt');

const log = require('@logs');

module.exports = (req, res, next) => {
    const token = req.get('token');
    if(empty(token))
        return res.status(401).json({ "estatus" : false, "result" : `err: Sin token` });
    try {
        Jwt.setDatas(token).valida();

        return next();
    } catch (err) {
        log('./logs/db_err', err);
        return res.status(400).json({ "estatus" : false, err });
    }
};