"use strict";
require('module-alias/register');

const { entorno } = require('@confi/yargs'),
    { URL_HOST } = require('@confi')[entorno];

const mongoose = require('mongoose');

mongoose.connect(URL_HOST, { 'useNewUrlParser': true, 'useCreateIndex' : true });

module.exports = mongoose;