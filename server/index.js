"use strict";
require('module-alias/register');

require('@confi/hbs');

const express = require('express'),
    { resolve } = require('path');

const app = express();

app.use(express.static(resolve('./public/html')));

app.set('view engine', 'hbs');
app.set('views', resolve('./public/views'));

require('./middleware')(app);
require('./routes')(app);

module.exports = app;