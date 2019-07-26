"use strict";

const morgan = require('morgan'),
    { json:BP_Json } = require('body-parser'),
    helmet = require('helmet'),
    cors = require('cors'),
    fileUpload = require('express-fileupload');

const valida = require('./valida_mid'),
    loginMid = require('./loggin_mid'),
    usuarioMid = require('./usuario_mid'),
    categoriaMid = require('./categoria_mid'),
    productoMid = require('./producto_mid'),
    uploadMid = require('./upload_mid');

module.exports = app => {
    //Desabilityar x-powered-by
    app.disable('x-powered-by');

    app.use(cors());
    
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
        next();
    });

    app.use(helmet(), BP_Json(), morgan('short'));

    app.use(fileUpload({ useTempFiles: true }));

    app.use(['/loggin', '/token/sign/in'], loginMid);
    app.use('/sys', valida);
    app.use('/sys/user', usuarioMid);
    app.use('/sys/categoria', categoriaMid);
    app.use('/sys/producto', productoMid);
    app.use('/sys/upload', uploadMid);
};