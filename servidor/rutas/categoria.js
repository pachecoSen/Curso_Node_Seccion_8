"use strict";
require('module-alias/register');

const { isEmpty } = require('underscore');

const ModelCategoriaData = require('@basemodel/categoria_mod');

const Query = new require('@basehelping/query');

const log = require('@logs');

const base_uri = '/sys/categoria';

module.exports = app => {
    app.get(`${base_uri}/:id?`, (req, res) => {
        const search = Query.setModelo(ModelCategoriaData).setSelect(['categoria', 'descripcion']);
        if(!isEmpty(req.params.id))
            search.setFiltro('_id').setValue(req.params.id);

        search.search()
            .then(result => {
                return res.status(200).json({ "estatus" : true, result })
            })
            .catch(err => {
                log('./logs/db_err', err);
                return res.status(400).json({ "estatus" : false, err });
            });

        search.end();

        return false;
    });

    app.post(`${base_uri}/new`, (req, res) => {
        const { id:usuario } = req._user;
        const { categoria, descripcion } = req.body;
        const newCategoria = new ModelCategoriaData({categoria, descripcion, usuario});
        newCategoria.save((err, categoria) => {
            if(err){
                log('./logs/db_err', err);
                return res.status(400).json({ "estatus" : false, err });
            }

            return res.status(200).json({ "estatus" : true, categoria });
        });
    });

    app.get(`${base_uri}/del/:id`, (req, res) => {
        const { id:_id } = req.params;
        ModelCategoriaData.deleteOne({ _id }, err => {
            if(err){
                log('./logs/db_err', err);
                return res.status(400).json({ "estatus" : false, err });
            }

            return res.status(200).json({ "estatus" : true, 'msg' : `Categoria(ID:${_id}): fue elimando.` });
        });
    });

    app.post(`${base_uri}/update/:id`, async (req, res) => {
        const { id:_id } = req.params;
        const { categoria, descripcion } = req.body;
        const update = await ModelCategoriaData.updateOne({ _id }, { categoria, descripcion });
        if(1 === update.ok)
            return res.status(200).json({ "estatus" : true, 'msg' : `Categoria(ID:${_id}): fue actualizado.` });
    });
}