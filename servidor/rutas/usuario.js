"use strict";
require('module-alias/register');

const empty = require('is-empty');

const { setData } = require('@basemiddleware/usuario_mid'),
    encriptor = require('@basemiddleware/password_mid');

const ModelUsuarioData = require('@basemodel/usuario_mod');

const Query = new require('@basehelping/query.js');

const log = require('@logs');

const base_uri = '/sys/user';

module.exports = app => {
    app.post(`${ base_uri }/new`, setData, encriptor, (req, res) => {
        const { nombre, email, password, img, role, estado, google } = req.body;
        const usuario = new ModelUsuarioData({nombre, email, password, img, role, estado, google});
        usuario.save((err, usuario) => {
            if(err){
                log('./logs/db_err', err);
                return res.status(400).json({ "estatus" : false, err });
            }

            return res.status(200).json({ "estatus" : true, usuario });
        });
    });

    app.post(`${ base_uri }/chnage/:id`, setData, (req, res) => {
        const { params, body } = req;
        ModelUsuarioData.findByIdAndUpdate(params.id, body, {'new' : true, 'runValidators' : true, 'context' : 'query'}, (err, usuario) => {
            if(err){
                log('./logs/db_err', err);
                return res.status(400).json({ "estatus" : false, err });
            }

            return res.status(200).json({ "estatus" : true, usuario });
        });
    });

    app.get(`${ base_uri }/:opt(unlock|lock)/:id`, (req, res) => {
        const { opt, id } = req.params;
        ModelUsuarioData.findByIdAndUpdate(id, {'estado' : opt === 'unlock'}, {'new' : true, 'context' : 'query'}, (err, usuario) => {
            if(err){
                log('./logs/db_err', err);
                return res.status(400).json({ "estatus" : false, err });
            }

            usuario = `Usuario [${ id }]${ usuario.nombre } - ${ opt }`;
            return res.status(200).json({ "estatus" : true, usuario });
        });
    });

    app.get(`${ base_uri }/search/:id?`, setData, (req, res) => {
        const { pag, cant:limit } = req.query;
        const search = Query.setModelo(ModelUsuarioData);
        if(empty(req.params.id)){
            search.setLimite(limit).setPagina(pag).setSelect(['_id', 'nombre', 'email', 'role', 'google', 'estado']);
            Promise.all([search.find(), search.inf()])
                .then(result => {
                    let result_s = {};
                    result.forEach(i => {
                        result_s = Object.assign(result_s, i);
                    });

                    return result_s;
                })
                .then(result => res.status(200).json({ "estatus" : true, result }))
                .catch(err => {
                    log('./logs/db_err', err);
                    return res.status(400).json({ "estatus" : false, err });
                });

            search.end();

            return false;
        }

        search.setFiltro('_id').setValue(req.params.id).find()
            .then(result => res.status(200).json({ "estatus" : true, result }))
            .catch(err => {
                log('./logs/db_err', err);
                return res.status(400).json({ "estatus" : false, err });
            });

        search.end(); 
    });
};