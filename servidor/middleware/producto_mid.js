"use strict";

const { pick } = require('underscore'),
    isEmpty = require('is-empty');

const { basename } = require('path');

const log = require('@logs');

module.exports = (req, res, next) => {
    try {
        if('new' === basename(req.url)){
            if(isEmpty(req.body))
                return res.status(400).json({ "estatus" : false, "res": `Faltan datos.` }).end();
    
            req.body = pick(req.body, 'producto', 'precio', 'descripcion', 'categoria');
            ['producto', 'precio', 'descripcion', 'categoria'].forEach(i => {
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
    
            req.body = pick(req.body, 'producto', 'precio', 'descripcion', 'categoria');
            ['producto', 'precio', 'descripcion', 'categoria'].forEach(i => {
                if(isEmpty(req.body[i]))
                    return res.status(400).json({ "estatus" : false, "res": `Dato ${ i } faltante.` }).end();
            });
    
            return next();
        }
        
    
        return next();
    }
    catch (err) {
        log('./logs/sys_err', err);
        return res.status(500).json({ "estatus" : false, err });
    }
};