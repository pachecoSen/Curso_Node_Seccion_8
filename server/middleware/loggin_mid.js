"use strict";

const isEmpty = require('is-empty');

module.exports = (req, res, next) => {
    if('/loggin' === req.baseUrl){
        ['email', 'password'].forEach(i => {
            if(isEmpty(req.body[i]))
                return res.status(400).json({ "estatus" : false, "res": `Dato ${ i } faltante.` }).end();
        });

        return next();
    }
    
    if('/token/sign/in' === req.baseUrl){
        if(isEmpty(req.body.token))
            return res.status(400).json({ "estatus" : false, "res": `Dato token faltante.` }).end();

        return next();
    }

    return next();
};