"use strict";
require('module-alias/register');

const empty = require('is-empty');

const ModelUsuarioData = require('@basemodel/usuario_mod');

const Jwt = new require('@basehelping/jwt');

const Query = new require('@basehelping/query');

const log = require('@logs');

module.exports = (req, res, next) => {
    const token = req.get('token');
    if(empty(token))
        return res.status(401).json({ "estatus" : false, "result" : `err: Sin token` });
    try {
        req._user = Jwt.setDatas(token).valida();
        req._user = req._user.datas;
        const { id:_id, email } = req._user;
        const search = Query.setModelo(ModelUsuarioData).setFiltro({ _id, email }).setSelect('role');
        search.find()
            .then(result => result.row_s[0].role)
            .then(result => {
                req._user['rol'] = result;

                return next();
            })
            .catch(err => {
                log('./logs/db_err', err);
                
                return res.status(400).json({ "estatus" : false, err });
            });

        search.end();
    } catch (err) {
        log('./logs/db_err', err);
        return res.status(400).json({ "estatus" : false, err });
    }
};