"use strict";

const empty = require('is-empty'),
    _ = require('underscore');

let usuarioMid = {};

const base_uri = '/sys/user';

usuarioMid.setData = (req, res, next) => {
    const { path } = req;
    if(`${ base_uri }/new` === path){
        let item = ['nombre', 'email', 'password', 'role'];
        item.forEach(i => {
            if(empty(req.body[i]))
                return res.status(400).json({ "estatus" : false, "res": `Dato ${ i } faltante.` }).end();
        });

        item = ['estado', 'google'];
        item.forEach(i => {
            if(!/^(1|0)$/.test(req.body[i]))
                return res.status(400).json({ "estatus" : false, "res": `Dato ${ i } faltante o incorrectos.` }).end();
        });
    }

    const { path:_path } = req.route;
    if(`${ base_uri }/chnage/:id` === _path){
        let item = ['nombre', 'email', 'role'];
        item.forEach(i => {
            if(empty(req.body[i]))
                return res.status(400).json({ "estatus" : false, "res": `Dato ${ i } faltante.` }).end();
        });

        item = ['estado', 'google'];
        item.forEach(i => {
            if(!/^(1|0)$/.test(req.body[i]))
                return res.status(400).json({ "estatus" : false, "res": `Dato ${ i } faltante o incorrectos.` }).end();
        });

        req.body = _.pick(req.body, 'nombre', 'role', 'email', 'img', 'estado');
    }

    if(`${ base_uri }/:id?` === _path){
        if(empty(req.query.pag) || 1 > req.query.pag)
            return res.status(400).json({ "estatus" : false, "res": `Parametro pag faltante o menor a 1.` }).end();
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