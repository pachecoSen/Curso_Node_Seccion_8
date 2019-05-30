"use strict";

const dev = require('./dev'),
    pro = require('./pro');

const config = { pro, dev };

module.exports = config;