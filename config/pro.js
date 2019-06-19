"use strict";

const { address } = require('ip');

const pro = {};

pro.PORT = process.env.PORT || 8080;
pro.IP = process.env.IP || address();

/**
 * Configuracion MongoDB
*/
pro.URL_HOST = `mongodb+srv://${ process.env.MONGODBUSER }:${ process.env.MONGODBPASSWORD }@cluster0-lfls9.gcp.mongodb.net/cafe?retryWrites=true&w=majority`;

/**
 * Configuracion Hash
 */
pro.CICLOS = 15;
pro.SECRET_TOKEN = process.env.ITSECRET;
pro.CADUCA = process.env.TIME_CADUCA;

module.exports = pro;