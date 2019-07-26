"use strict";
require('module-alias/register');

const uniqueValide = require('mongoose-unique-validator');

const { Schema, model } = require('@baseserver/conn');

const imagenSchema = require('./Schema/imagenSchema');

const newShema = new Schema(imagenSchema)
    .plugin(uniqueValide, { 'message' : '{PATH} debe ser unico' });

module.exports = model('productos', newShema);