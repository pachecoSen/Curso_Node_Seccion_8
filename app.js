"use strict";

const { entorno } = require('./config/yargs'),
    { PORT } = require('./config')[entorno];

const { Terminal:terminal } = require('terminal-kit');

const app = require('./servidor');

app.listen(PORT, () => {
    terminal().green(`Servidor iniciado en el puerto ${ PORT }`);
});