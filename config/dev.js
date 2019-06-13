"use strict";

const dev = {};

dev.PORT = process.env.PORT || 1000;
dev.IP = process.env.IP || 'localhost';

/**
 * Configuracion MongoDB
*/
dev.URL_HOST = `mongodb://${ dev.IP }:27017/cafe`;

/**
 * Configuracion Hash
 */
dev.CICLOS = 15;

module.exports = dev;