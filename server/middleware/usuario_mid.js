"use strict";

const isEmpty = require('is-empty'),
    { basename } = require('path');

module.exports = (req, res, next) => {
    if('new' === basename(req.url)){
        ['nombre', 'email', 'password'].forEach(i => {
            if(isEmpty(req.body[i]))
                return res.status(400).json({ "estatus" : false, "res": `Dato ${ i } faltante.` }).end();
        });

        Object.assign(req.body, {'role' : 'ADMIN_ROLE', 'google' : 0, 'estado' : 1});
        
        return next();
    }

    return next();
};