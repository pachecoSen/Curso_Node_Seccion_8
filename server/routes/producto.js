"use strict";
require('module-alias/register');

const isEmpty = require('is-empty');

const ModelProductoData = require('@basemodel/producto_mod');

const log = require('@logs');

const base_uri = '/sys/producto';

module.exports = app => {
    app.get(`${base_uri}/:id?`, (req, res) => {
        const producto = new RegExp(req.query.producto, 'i');
        let where = {'estado' : true, producto };
        if(!isEmpty(req.params.id))
            where['_id'] = req.params.id;

        ModelProductoData
            .find(where, ['producto', 'categoria', 'descripcion', 'usuarios', 'img'])
            .sort('categoria')
            .populate('usuarios', ['nombre', 'email'])
            .populate('categorias', ['categoria', 'descripcion'])
            .exec((err, producto) => {
                if(err){
                    log('./logs/db_err', err);
                    return res.status(400).json({ "estatus" : false, err });
                }

                return res.status(200).json({ "estatus" : true, producto })
            });
        
        return false;
    });

    app.post(`${base_uri}/new`, (req, res) => {
        const { id:usuarios } = req._user;
        const { producto, precio, descripcion, categoria:categorias } = req.body;
        const newCategoria = new ModelProductoData({ producto, precio, descripcion, categorias, usuarios });
        newCategoria.save((err, producto) => {
            if(err){
                log('./logs/db_err', err);
                return res.status(400).json({ "estatus" : false, err });
            }

            return res.status(200).json({ "estatus" : true, producto });
        });
    });

    app.get(`${base_uri}/del/:id`, (req, res) => {
        const { id:_id } = req.params;
        ModelProductoData.deleteOne({ _id }, err => {
            if(err){
                log('./logs/db_err', err);
                return res.status(400).json({ "estatus" : false, err });
            }

            return res.status(200).json({ "estatus" : true, 'msg' : `Categoria(ID:${_id}): fue elimando.` });
        });
    });

    app.post(`${base_uri}/update/:id`, async (req, res) => {
        const { id:_id } = req.params;
        const { producto, precio, descripcion, categoria:categorias } = req.body;
        const update = await ModelProductoData.updateOne({ _id }, { producto, precio, descripcion, categorias });
        if(1 === update.ok)
            return res.status(200).json({ "estatus" : true, 'msg' : `Categoria(ID:${_id}): fue actualizado.` });
    });
}