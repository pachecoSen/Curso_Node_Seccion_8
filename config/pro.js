"use strict";

const { address } = require('ip');

const dev = {};

dev.PORT = process.env.PORT || 8080;
dev.IP = process.env.IP || address();

/**
 * Configuracion MongoDB
*/
dev.PORTDB = 27017;
dev.DB = 'cafe';

module.exports = dev;