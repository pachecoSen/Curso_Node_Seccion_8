"use strict";
require('module-alias/register');

module.exports = (req, res, next) => {
    const { rol } = req._user;
    if('SUPER_ROLE' !== rol && 'ADMIN_ROLE' !== rol)
        return res.status(403).json({ "estatus" : false, "res": `Sin permisos necesarios` }).end();

    return next();
};