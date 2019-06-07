"use strict";

const uniqueValide = require('mongoose-unique-validator');

const { Schema, model } = require('@baseserver/conn');

const usuarioSchema = require('./Schema/usuarioSchema');

const newShema = new Schema(usuarioSchema)
    .plugin(uniqueValide, { 'message' : '{PATH} debe ser unico' });

newShema.methods.toJSON = function () {
    let user = this.toObject();
    delete user.password;

    return user;
}

module.exports = model('usuario', newShema);