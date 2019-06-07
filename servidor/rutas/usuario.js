"use strict";
require('module-alias/register');

const empty = require('is-empty');

const { setData, setParams } = require('@basemiddleware/usuario_mid'),
    encriptor = require('@basemiddleware/password_mid');

const ModelUsuarioData = require('@basemodel/usuario_mod');

const log = require('@logs');

const base_uri = '/sys/user';

module.exports = app => {
    app.get(`${ base_uri }/:id?`, (req, res) => {
        const { id } = req.params;
        res.redirect(`${ base_uri }/${ !empty(id) ? `view/${ id }` : 'lister' }`);
    });

    app.get(`${ base_uri }/lister`, (req, res) =>  res.json({"estatus" : true, "res": 'En Desarrolo'}));

    app.get(`${ base_uri }/view/:id`, (req, res) =>  res.json({"estatus" : true, "res": `En Desarrolo - ${ req.params.id }`}));

    app.post(`${ base_uri }/new`, setData, encriptor, (req, res) => {
        const { nombre, email, password, img, role, estado, google } = req.body;
        const usuario = new ModelUsuarioData({nombre, email, password, img, role, estado, google});
        usuario.save((err, usuario) => {
            if(err){
                log('./logs/db_err', err);
                return res.status(400).json({
                    "estatus" : false, err
                });
            }

            return res.status(200).json({
                "estatus" : true, usuario
            });
        });
    });

    app.post(`${ base_uri }/chnage/:id`, setParams, setData, encriptor, (req, res) => {
        const { params, body } = req;
        ModelUsuarioData.findByIdAndUpdate(params.id, body, (err, usuario) => {
            if(err){
                log('./logs/db_err', err);
                return res.status(400).json({
                    "estatus" : false, err
                });
            }

            return res.status(200).json({
                "estatus" : true, usuario
            });
        });
    });
};