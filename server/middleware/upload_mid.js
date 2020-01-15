"use strict";
require('module-alias/register');

const isEmpty = require('is-empty'),
    { pick } = require('underscore'),
    { getExtension } = require('mime'),
    { basename, dirname } = require('path');

const ModelProductoData = require('@basemodel/producto_mod'),
    ModelUsuarioData = require('@basemodel/usuario_mod');

const log = require('@logs');

module.exports = (req, res, next) => {
    const { files } = req;
    if (isEmpty(files))
        return res.status(400).json({ "estatus" : false, "res": `Archivos no subidos.` }).end();

    if(isEmpty(files.ima))
        return res.status(400).json({ "estatus" : false, "res": `Archivos "ima" no encontrado.` }).end();
    
    if(0 > ['png', 'jpeg', 'jpg'].indexOf(getExtension(files.ima.mimetype)))
        return res.status(400).json({ "estatus" : false, "res": `Extencion de archivo erronia.` }).end();

    req.files = pick(files, 'ima');
    if(/\/sys\/upload\/(producto|user)\/imagen\/\w+/.test(req.originalUrl)){
        const _id = basename(req.originalUrl),
            valId = basename(dirname(req.originalUrl)) === 'producto' ? ModelProductoData : ModelUsuarioData;
        valId.find({ _id, 'estado' : true }).exec((err, search) => {
            if(err){
                log('./logs/db_err', err);
                return res.status(400).json({ "estatus" : false, err });
            }

            if(1 === search.length)
                return next();

            return res.status(400).json({ "estatus" : false, 'res' : `ID(${_id}) de ${basename(dirname(req.originalUrl)) === 'producto' ? 'producto' : 'usuario'} incorrecto o no encontrado.` });
        });

        return false;
    }
    

    return next();
}