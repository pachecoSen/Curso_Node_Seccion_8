"use strict";
require('module-alias/register');

const isEmpty = require('is-empty');

const ModelUsuarioData = require('@basemodel/usuario_mod');

const Jwt = new require('@basehelping/jwt');

const log = require('@logs');

module.exports = (req, res, next) => {
    const token = req.get('token');
    if(isEmpty(token))
        return res.status(401).json({ "estatus" : false, "result" : `err: Sin token` });

    try {
        req._user = Jwt.setDatas(token).valida();
        req._user = req._user.datas;
        const { id:_id, email } = req._user;
        
        ModelUsuarioData.find({ _id, email }, 'role', (err, data) => {
            if(err){
                log('./logs/db_err', err);
                return res.status(400).json({ "estatus" : false, err });
            }

            if(isEmpty(data))
                return res.status(401).json({ "estatus" : false, 'err' : 'Token Invalido' });

            req._user['rol'] = data[0].role;

            return next();
        });

        return false;
    } catch (err) {
        log('./logs/db_err', err);
        return res.status(400).json({ "estatus" : false, err });
    }
};