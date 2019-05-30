"use strict";

const empty = require('is-empty');

let usuarioMid = {};

usuarioMid.setData = (req, res, next) => {
    const { path } = req;
    if('/sys/user/new' === path){
        if(empty(req.body.nombre)){
            res.status(400).json({
                "estatus" : false,
                "res": 'Falta nombre'
            }).end();

            return false;
        }
    }

    return next();
}

module.exports = usuarioMid;