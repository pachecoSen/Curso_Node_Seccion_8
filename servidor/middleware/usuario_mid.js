"use strict";

const empty = require('is-empty');

let usuarioMid = {};

const base_uri = '/sys/user';

usuarioMid.setData = (req, res, next) => {
    const { path } = req;
    const { path:_path } = req.route;
    if(`${ base_uri }/new` === path || `${ base_uri }/chnage/:id` === _path){
        const item = ['nombre', 'email', 'password'];
        item.forEach(i => {
            if(empty(req.body[i]))
                return res.status(400).json({ "estatus" : false, "res": `Dato ${ i } faltante.` }).end();
        })
    }

    return next();
}

usuarioMid.setParams = (req, res, next) => {
    
    const { path } = req.route;
    if(`${ base_uri }/chnage/:id` === path){
        if(empty(req.params.id))
            return res.status(400).json({ "estatus" : false, "res": `Dato id faltante o incorrecto.` }).end();
    }

    return next();
}

module.exports = usuarioMid;