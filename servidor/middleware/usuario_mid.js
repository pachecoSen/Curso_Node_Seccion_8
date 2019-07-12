"use strict";

const isEmpty = require('is-empty'),
    { basename } = require('path');

module.exports = (req, res, next) => {
    if('new' === basename(req.url)){
        ['nombre', 'email', 'password'].forEach(i => {
            if(isEmpty(req.body[i]))
                return res.status(400).json({ "estatus" : false, "res": `Dato ${ i } faltante.` }).end();
        });

        Object.assign(req.body, {'role' : 'ADMIN_ROLE', 'google' : 0, 'estado' : 1});
        
        return next();
    }

    return next();
};

/*usuarioMid.setData = (req, res, next) => {
    if(!empty(req._parsedUrl.pathname)){
        const { pathname:_path } = req._parsedUrl;
        if(`${ base_uri }/new` === _path){
            let item = ['nombre', 'email', 'password'];
            item.forEach(i => {
                if(empty(req.body[i]))
                    return res.status(400).json({ "estatus" : false, "res": `Dato ${ i } faltante.` }).end();
            });
            req.body['role'] = 'SUPER_ROLE';
            req.body['estado'] = 1;
            req.body['google'] = 0;
        }

        if(/^\/sys\/user\/chnage\/\w+$/.test(_path)){
            let item = ['nombre', 'email', 'role'];
            item.forEach(i => {
                if(empty(req.body[i]))
                    return res.status(400).json({ "estatus" : false, "res": `Dato ${ i } faltante.` }).end();
            });

            item = ['estado', 'google'];
            item.forEach(i => {
                if(!/^(1|0)$/.test(req.body[i]))
                    return res.status(400).json({ "estatus" : false, "res": `Dato ${ i } faltante o incorrectos.` }).end();
            });

            req.body = pick(req.body, 'nombre', 'role', 'email', 'img', 'estado');
        }

        if(`${ base_uri }/search/` === _path){
            if(empty(req.query.pag) && empty(req.params.id))
                return res.status(400).json({ "estatus" : false, "res": `Sin Parametro o ID.` }).end();

            if(empty(req.params.id) && 1 > req.query.pag)
                return res.status(400).json({ "estatus" : false, "res": `Parametro pag faltante o menor a 1.` }).end();
        }
    }

    return next();
}

module.exports = usuarioMid;*/