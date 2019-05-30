"use strict";

const express = require('express'),
    { json:BP_Json } = require('body-parser');
const app = express();

//Parse los dataos en Formato JSON
app.use(BP_Json());

require('./rutas')(app);

module.exports = app;