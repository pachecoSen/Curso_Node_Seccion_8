"use strict";

const yargs = require("yargs").options({
    "entorno" : {
        "alias" : 's',
        "desc" : 'Entorno de Trabajo',
        "demand" : true,
        "default" : 'dev'
    }
});

module.exports = yargs.argv;