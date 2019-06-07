"use strict";

const dev = require('./dev'),
    pro = require('./pro');

/**
 * Configuracion de Paginado
 */
dev.PAGINADO = 5;
pro.PAGINADO = 5;

const config = { pro, dev };

module.exports = config;