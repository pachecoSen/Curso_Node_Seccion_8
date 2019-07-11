"use strict";

module.exports = app => {
    ['inicio', 'usuario', 'html', 'categoria'].forEach(i => {
        require(`./${ i }`)(app)    
    });
};