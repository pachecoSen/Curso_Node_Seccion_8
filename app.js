"use strict";

const { PORT } = require('./config/config');

const { Terminal:terminal } = require('terminal-kit');

const app = require('./servidor/server');


app.listen(PORT, () => {
    terminal().green(`Servidor iniciado en el puerto ${ PORT }`);
});