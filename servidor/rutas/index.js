"use strict";

module.exports = app => {
    require('./inicio')(app);
    require('./usuario')(app);
    require('./html')(app);
};