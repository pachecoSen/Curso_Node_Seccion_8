"use strict";

const { entorno } = require('./config/yargs'),
    { PORT, IP } = require('./config')[entorno];

const { Terminal:terminal } = require('terminal-kit'),
    empty = require('is-empty');

const app = require('./servidor');
const db = require('./servidor/conn');

const log = require('@logs');

app.listen(PORT, () => {
    terminal().green(`Servidor iniciado en ${ IP }:${ PORT }`);
    db.connection.on('error', err => {
        terminal().red(`${ '\n' }Conexion de Base de Datos... failed`);
        log('./logs/db_err', err);
    });
});