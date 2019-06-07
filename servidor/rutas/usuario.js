"use strict";
require('module-alias/register');

const { entorno } = require('@confi/yargs'),
    { PAGINADO } = require('@confi')[entorno];

const { setData, setParams } = require('@basemiddleware/usuario_mid'),
    encriptor = require('@basemiddleware/password_mid');

const ModelUsuarioData = require('@basemodel/usuario_mod');

const log = require('@logs');

const base_uri = '/sys/user';

module.exports = app => {
    app.get(`${ base_uri }/:id?`, setData, (req, res) => {
        let { pag, cant:limit } = req.query;
        limit = limit || PAGINADO;
        limit = Number(limit);
        pag = Number(pag);
        pag = (pag - 1) * limit;
        const search =ModelUsuarioData.find({});
        search.skip(pag).limit(limit);
        search.exec((err, usuarios) => {
            if(err){
                log('./logs/db_err', err);
                return res.status(400).json({ "estatus" : false, err });
            }

            return res.status(200).json({ "estatus" : true, usuarios });
        })
    });

    app.post(`${ base_uri }/new`, setData, encriptor, (req, res) => {
        const { nombre, email, password, img, role, estado, google } = req.body;
        const usuario = new ModelUsuarioData({nombre, email, password, img, role, estado, google});
        usuario.save((err, usuario) => {
            if(err){
                log('./logs/db_err', err);
                return res.status(400).json({ "estatus" : false, err });
            }

            return res.status(200).json({
                "estatus" : true, usuario
            });
        });
    });

    app.post(`${ base_uri }/chnage/:id`, setParams, setData, (req, res) => {
        const { params, body } = req;
        ModelUsuarioData.findByIdAndUpdate(params.id, body, {'new' : true, 'runValidators' : true, 'context' : 'query'}, (err, usuario) => {
            if(err){
                log('./logs/db_err', err);
                return res.status(400).json({ "estatus" : false, err });
            }

            return res.status(200).json({ "estatus" : true, usuario });
        });
    });
};