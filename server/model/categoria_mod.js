"use strict";
require('module-alias/register');

const uniqueValide = require('mongoose-unique-validator');

const { Schema, model } = require('@baseserver/conn');

const categoriaSchema = require('./Schema/categoriaSchema');

const newShema = new Schema(categoriaSchema)
    .plugin(uniqueValide, { 'message' : '{PATH} debe ser unico' });

module.exports = model('categorias', newShema);