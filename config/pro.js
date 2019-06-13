"use strict";

const { address } = require('ip');

const dev = {};

dev.PORT = process.env.PORT || 8080;
dev.IP = process.env.IP || address();

/**
 * Configuracion MongoDB
*/
dev.URL_HOST = `mongodb+srv://${ process.env.MONGODBUSER }:${ process.env.MONGODBPASSWORD }@cluster0-lfls9.gcp.mongodb.net/cafe?retryWrites=true&w=majority`;

/**
 * Configuracion Hash
 */
dev.CICLOS = 15;

module.exports = dev;