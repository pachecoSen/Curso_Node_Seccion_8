"use strict";

const dev = {};

dev.PORT = process.env.PORT || 1000;
dev.IP = process.env.IP || 'localhost';

/**
 * Configuracion MongoDB
*/
dev.PORTDB = 27017;
dev.DB = 'cafe';

module.exports = dev;