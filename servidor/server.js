"use strict";

const express = require('express');
const app = express();

require('./rutas')(app);

module.exports = app;