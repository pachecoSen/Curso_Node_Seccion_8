"use strict";
require('module-alias/register');

const { resolve, join } = require('path'),
    { Terminal:terminal } = require('terminal-kit'),
    { getExtension } = require('mime');

const ModelImagenData = require('@basemodel/imagen_mod'),
    ModelProductoData = require('@basemodel/producto_mod'),
    ModelUsuarioData = require('@basemodel/usuario_mod');

const log = require('@logs');

const base_uri = '/sys/upload';
let rutaUploads = resolve('./uploads');

const almacenado = (file, original, tag) => {
    const fecha = new Date().getDate(),
        newImagen = new ModelImagenData({ file, original, tag, fecha });

    return new Promise((res, rej) => {
        newImagen.save((err, imagen) => {
            if(err){
                log('./logs/db_err', err);
                rej(err);

                return false;
            }

            res(imagen._id);
        });
    });
};

const asociar = (img, _id, modelo) => {
    modelo = 'user' === modelo ? ModelUsuarioData : ModelProductoData;
    
    return modelo.updateOne({ _id }, { img })
};

module.exports = app => {
    app.post(`${base_uri}/imagen`, (req, res) => {
        const { ima } = req.files,
            time = new Date();
        const nameFile = `${ time.getMonth() }${ time.getDay() }.${ ima.md5 }.${ time.getMilliseconds() }`;
        const file = `${nameFile}.${getExtension(ima.mimetype)}`;
        ima.mv(join(rutaUploads, 'ima', file), err => {
            if(err){
                log('./logs/sys_err', err);
                terminal().red(`Directorio: ${rutaUploads}.......... Fallo\n`);

                return res.status(500).json({ "estatus" : false, "res": err }).end();
            }

            return res.status(200).json({ "estatus" : true, "res": `Archivo ${ima.name} almacenado` }).end();
        })
    });

    app.post(`${base_uri}/:opt(user|producto)/imagen/:id`, (req, res) => {
        const { ima } = req.files,
            ruta = join(rutaUploads, req.params.opt === 'user' ? 'user' : 'sys'),
            time = new Date();

        const nameFile = `${time.getMonth()}${time.getDay()}.${ima.md5}.${time.getMilliseconds()}.${getExtension(ima.mimetype)}`;

        ima.mv(join(ruta, nameFile), async err => {
            if(err){
                log('./logs/sys_err', err);
                terminal().red(`Directorio: ${ruta}.......... Fallo\n`);

                return res.status(500).json({ "estatus" : false, "res": err }).end();
            }
            
            const tag = req.params.opt === 'user' ? 'user' : 'producto';
            let newImagen = await almacenado(nameFile, ima.name, tag);
            newImagen = `${ req.protocol }://${ req.get('host') }/sys/down/ima/${ newImagen }`;
            const result = await asociar(newImagen, req.params.id, req.params.opt);
            
            return res.status(200).json({ "estatus" : true, "res": `Archivo${ 1 !== result.ok ? 'no' : ''} ${ima.name} almacenado, para ${req.params.opt === 'user' ? 'usuario' : 'producto'} ID(${ req.params.id })` }).end();
        });
    });
};