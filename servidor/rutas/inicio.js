"use strict";

module.exports = app => {
    app.get('/', (req, res) => {
        res.send('Bienvenido a API-Rest');
    });
}