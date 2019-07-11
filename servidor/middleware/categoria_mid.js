"use strict";

const { pick } = require('underscore'),
    isEmpty = require('is-empty');

const { basename } = require('path');

module.exports = (req, res, next) => {
    if('new' === basename(req.url)){
        if(isEmpty(req.body))
            return res.status(400).json({ "estatus" : false, "res": `Faltan datos.` }).end();

        req.body = pick(req.body, 'categoria', 'descripcion');
        ['categoria', 'descripcion'].forEach(i => {
            if(isEmpty(req.body[i]))
                return res.status(400).json({ "estatus" : false, "res": `Dato ${ i } faltante.` }).end();
        });

        return next();
    }
    
    if(/\/del\/\w+/.test(req.url)){
        const { rol } = req._user;
        if(/(SUPER_ROLE|ADMIN_ROLE)/.test(rol))
            return next();

        return res.status(403).json({ "estatus" : false, "res": `Sin permisos necesarios` }).end();
    }

    if(/\/update\/\w+/.test(req.url)){
        if(isEmpty(req.body))
            return res.status(400).json({ "estatus" : false, "res": `Faltan datos.` }).end();

        req.body = pick(req.body, 'categoria', 'descripcion');
        ['categoria', 'descripcion'].forEach(i => {
            if(isEmpty(req.body[i]))
                return res.status(400).json({ "estatus" : false, "res": `Dato ${ i } faltante.` }).end();
        });

        return next();
    }
    

    return next();
};