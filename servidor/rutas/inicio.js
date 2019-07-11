"use strict";
require('module-alias/register');

const { entorno } = require('@confi/yargs'),
    { API_KEY_SIGN_IN:apiKey, CICLOS } = require('@confi')[entorno];

const empty = require('is-empty'),
    { compare } = require('bcrypt'),
    { isEmpty, pick } = require('underscore'),
    hash = require('bcrypt');

const ModelUsuarioData = require('@basemodel/usuario_mod');

const Query = new require('@basehelping/query'),
    Jwt = new require('@basehelping/jwt'),
    google = require('@basehelping/google');

const log = require('@logs');

module.exports = app => {
    app.get('/', (req, res) => res.send('Bienvenido a API-Rest'));

    app.post('/token/sign/in', (req, res) => {
        const { token } = req.body;
        google(apiKey, token).then(async result => {
            const { email } = result;
            const search = Query.setModelo(ModelUsuarioData).setFiltro({ email });
            const data = await search.find().then(valida => valida.row_s);
            search.end();
            if(isEmpty(data)){
                const { name:nombre, picture:img } = result;
                const estado = true,
                    google = true,
                    role = 'USER_ROLE',
                    password = hash.hashSync(email, CICLOS);
                const usuario = new ModelUsuarioData({nombre, email, password, img, role, estado, google});
                usuario.save(async (err, usuario) => {
                    if(err){
                        log('./logs/db_err', err);
                        return res.status(400).json({ "estatus" : false, err });
                    }

                    const { _id:id, email } = usuario;
                    const token = await Jwt.setDatas( { id, email } ).token();
        
                    return res.status(200).json({ "estatus" : true, token });
                });

                return false;
            }

            result = data[0];
            const { id, email:correo, google } = result;
            if(false === google)
                return res.status(200).json({ "estatus" : true, 'result' : [] });

            const token = await Jwt.setDatas( { id, 'email' : correo } ).token();

            return res.status(200).json({ "estatus" : true, token });
        })
        .catch(err => {
            log('./logs/db_err', err);
            return res.status(400).json({ "estatus" : false, err });
        });
        
        return false;
    });

    app.post('/loggin', async (req, res) => {
        try {
            const { email, password } = req.body;
            const search = Query.setModelo(ModelUsuarioData).setFiltro({ email }).setSelect('password');
            let result = await search.find().then(result => result.row_s);
            search.end();
            if(empty(result))
                return res.status(200).json({ "estatus" : false, "result" : `err: Datos incorrectos` });
            
            result = pick(result[0], '_id', 'password');
            result = await compare(password, result.password).then(est => { return {'id' : result._id, est }; });
            if(false === result.est)
                return res.status(200).json({ "estatus" : false, "result" : `err: Datos incorrectos` });

            const { id } = result;
            const token = await Jwt.setDatas( { id, email } ).token();
            
            return res.status(200).json({ "estatus" : true, token });
        } catch (err) {
            log('./logs/db_err', err);
            return res.status(400).json({ "estatus" : false, err });
        }
    });
};