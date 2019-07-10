"use strict";
require('module-alias/register');

const { entorno } = require('@confi/yargs'),
    { API_KEY_SIGN_IN:apiKey } = require('@confi')[entorno];

const empty = require('is-empty'),
    { compare } = require('bcrypt'),
    { isEmpty } = require('underscore');

const ModelUsuarioData = require('@basemodel/usuario_mod');

const Query = new require('@basehelping/query'),
    Jwt = new require('@basehelping/jwt'),
    google = require('@basehelping/google');

const log = require('@logs');

module.exports = app => {
    app.get('/', (req, res) => res.send('Bienvenido a API-Rest'));

    app.post('/token/sign/in', (req, res) => {
        const { token } = req.body;
        google(apiKey, token).then(result => {
            const { email } = result;
            const search = Query.setModelo(ModelUsuarioData).setFiltro({ email });
            search.find()
                .then(valida => valida.row_s)
                .then(valida => {
                    if(isEmpty(valida)){
                        const { name:nombre, picture:img } = result;
                        const estado = true,
                            google = true,
                            role = 'USER_ROLE',
                            password = email;
                        const usuario = new ModelUsuarioData({nombre, email, password, img, role, estado, google});
                        usuario.save((err, usuario) => {
                            if(err){
                                log('./logs/db_err', err);
                                return res.status(400).json({ "estatus" : false, err });
                            }
                
                            return res.status(200).json({ "estatus" : true, usuario });
                        });

                        return false;
                    }

                    return valida[0];
                })
                .then(async result => {
                    const { id, email, google } = result;
                    if(false === google)
                        return res.status(200).json({ "estatus" : true, 'result' : [] });

                    const token = await Jwt.setDatas( { id, email } ).token();
                
                    return res.status(200).json({ "estatus" : true, token });
                });
            search.end();
        })
        .catch(err => {
            log('./logs/db_err', err);
            return res.status(400).json({ "estatus" : false, err });
        });
        
        return false;
    });

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