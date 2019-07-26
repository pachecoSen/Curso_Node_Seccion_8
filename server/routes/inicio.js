"use strict";
require('module-alias/register');

const { entorno } = require('@confi/yargs'),
    { API_KEY_SIGN_IN:apiKey, CICLOS } = require('@confi')[entorno];

const isEmpty = require('is-empty'),
    { compare } = require('bcrypt'),
    { pick } = require('underscore'),
    hash = require('bcrypt');

const ModelUsuarioData = require('@basemodel/usuario_mod');

const Jwt = new require('@basehelping/jwt'),
    google = require('@basehelping/google');

const log = require('@logs');

module.exports = app => {
    app.get('/', (req, res) => res.send('Bienvenido a API-Rest'));

    app.post('/token/sign/in', (req, res) => {
        google(apiKey, req.body.token).then(result => {
            const { email } = result;
            ModelUsuarioData.find({ email }, async (err, user) => {
                if(err){
                    log('./logs/db_err', err);
                    return res.status(400).json({ "estatus" : false, err });
                }

                if(isEmpty(user)){
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

                const {id, email:correo, google} = user[0];
                if(false === google)
                    return res.status(200).json({ "estatus" : true, 'result' : [] });

                const token = await Jwt.setDatas( { id, 'email' : correo } ).token();

                return res.status(200).json({ "estatus" : true, token });
            });

            return false;
        });
    });

    app.post('/loggin', (req, res) => {
        try {
            const { email, password } = req.body;
            ModelUsuarioData.find({ email }, 'password', async (err, user) => {
                if(err){
                    log('./logs/db_err', err);
                    return res.status(400).json({ "estatus" : false, err });
                }

                if(isEmpty(user))
                    return res.status(200).json({ "estatus" : false, "result" : `err: Datos incorrectos` });
                
                user = pick(user[0], '_id', 'password');
                if(false === await compare(password, user.password))
                    return res.status(200).json({ "estatus" : false, "result" : `err: Datos incorrectos` });
                
                const token = await Jwt.setDatas( { 'id' : user._id, email } ).token();

                return res.status(200).json({ "estatus" : true, token });
            });

            return false;
        } catch (err) {
            log('./logs/db_err', err);
            return res.status(400).json({ "estatus" : false, err });
        }
    });
};