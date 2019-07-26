"use strict";

const isEmpty = require('is-empty'),
    { pick } = require('underscore'),
    { getExtension } = require('mime');

module.exports = (req, res, next) => {
    const { files } = req;
    if (isEmpty(files))
        return res.status(400).json({ "estatus" : false, "res": `Archivos no subidos.` }).end();

    if(isEmpty(files.ima))
        return res.status(400).json({ "estatus" : false, "res": `Archivos "ima" no encontrado.` }).end();
    
    if(0 > ['png', 'jpeg', 'jpg'].indexOf(getExtension(files.ima.mimetype)))
        return res.status(400).json({ "estatus" : false, "res": `Extencion de archivo erronia.` }).end();

    req.files = pick(files, 'ima');

    console.log(req.params);

    return next();
}