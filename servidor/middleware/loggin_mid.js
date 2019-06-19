"use strict";

const empty = require('is-empty');

let logginMid = {};

logginMid.setData = (req, res, next) => {
    const { path } = req;

    if('/loggin' === path){
        const item = ['email', 'password'];
        item.forEach(i => {
            if(empty(req.body[i]))
                return res.status(400).json({ "estatus" : false, "res": `Dato ${ i } faltante.` }).end();
        });
    }

    return next();
};

module.exports = logginMid;