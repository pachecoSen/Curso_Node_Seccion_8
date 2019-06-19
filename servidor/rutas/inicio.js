"use strict";
require('module-alias/register');

const empty = require('is-empty'),
    { compare } = require('bcrypt');

const ModelUsuarioData = require('@basemodel/usuario_mod');

const Query = new require('@basehelping/query'),
    Jwt = new require('@basehelping/jwt');

const log = require('@logs');

module.exports = app => {
    app.get('/', (req, res) => res.send('Bienvenido a API-Rest'));

    app.post('/loggin', (req, res) => {
        const { email, password } = req.body;
        const search = Query.setModelo(ModelUsuarioData).setFiltro({ email }).setSelect('password');
        search.find()
            .then(result => result.row_s)
            .then(result => {
                if(empty(result))
                    return res.status(200).json({ "estatus" : false, "result" : `err: Datos incorrectos` });

                return result[0];
            })
            .then(result => {
                const { _id:id, password } = result;

                return {id, password };
            })
            .then(result => compare(password, result.password).then(est => { return {'id' : result.id, est }; }))
            .then(result => {
                if(false === result.est)
                    return res.status(200).json({ "estatus" : false, "result" : `err: Datos incorrectos` });

                const { id } = result;
                
                return Jwt.setDatas( { id, email } ).token();
            })
            .then(token => res.status(200).json({ "estatus" : true, token }))
            .catch(err => {
                log('./logs/db_err', err);
                return res.status(400).json({ "estatus" : false, err });
            });

        search.end();
    });
};