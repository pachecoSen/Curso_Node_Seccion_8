"use strict";
require('module-alias/register');

const log = require('@logs');

module.exports = app => {
    ['inicio', 'usuario', 'html', 'categoria', 'producto', 'upload'].forEach(i => {
        try {
            require(`./${ i }`)(app);
        }
        catch (error) {
            log('./logs/sys_err', error);
        }
    });
};