"use strict";
require('module-alias/register');

const empty = require('is-empty');

const { setData } = require('@basemiddleware/usuario_mid');

const base_uri = '/sys/user';

module.exports = app => {
    app.get(`${ base_uri }/:id?`, (req, res) => {
        const { id } = req.params;
        res.redirect(`${ base_uri }/${ !empty(id) ? `view/${ id }` : 'lister' }`);
    });

    app.get(`${ base_uri }/lister`, (req, res) =>  res.json({"estatus" : true, "res": 'En Desarrolo'}));

    app.get(`${ base_uri }/view/:id`, (req, res) =>  res.json({"estatus" : true, "res": `En Desarrolo - ${ req.params.id }`}));

    app.post(`${ base_uri }/new`, setData, (req, res) => {
        res.json({
            "estatus" : true,
            "res": 'Realizado'
        });
    });
};