"use strict";

const { entorno } = require('@confi/yargs'),
    { API_KEY_SIGN_IN:apiKey } = require('@confi')[entorno];

const base_uri = '/web';

module.exports = app => {
    app.get(`${base_uri}/inicio`, (req, res) => {
        const title = "Inicio - Google";
        let { host } = req.headers;
        host = `${ 'server-seccion-8.herokuapp.com' !== host ? req.protocol : 'https' }://${host}`;
        res.render('inicio',{ title, apiKey, host });
    });
};