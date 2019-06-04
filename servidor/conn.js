"use strict";
require('module-alias/register');

const { entorno } = require('@confi/yargs'),
    { IP, PORTDB, DB } = require('@confi')[entorno];

const mongoose = require('mongoose');

mongoose.connect(`mongodb://${ IP }:${ PORTDB }/${ DB }`, {useNewUrlParser: true});

module.exports = mongoose;