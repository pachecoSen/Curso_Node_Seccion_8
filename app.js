"use strict";
require('module-alias/register');

const { entorno } = require('./config/yargs'),
        { PORT, IP } = require('./config')[entorno];

const { Terminal:terminal } = require('terminal-kit'),
    { existsSync, mkdir } = require('fs'),
    { resolve, join } = require('path');

const app = require('./server');
const db = require('./server/conn');

const log = require('@logs');

const rutaUploads = resolve('./uploads');

try {
    app.listen(PORT, () => {
        terminal().green(`Servidor iniciado en ${ IP }:${ PORT }\n`);
        db.connection.on('error', err => {
            log('./logs/db_err', err);
            terminal().red(`${ '\n' }Conexion de Base de Datos... failed\n`);

            process.exit();
        });

        if(false === existsSync(join(rutaUploads, 'sys'))){
            const rutaUploadsSys = join(rutaUploads, 'sys');
            mkdir(rutaUploadsSys, { recursive: true }, err => {
                if(err){
                    log('./logs/sys_err', err);
                    terminal().red(`Directorio: ${rutaUploadsSys}.......... Fallo\n`);

                    return false;
                }

                terminal().green(`Directorio: ${rutaUploadsSys}.......... OK!\n`);
            });
        }

        if(false === existsSync(join(rutaUploads, 'user'))){
            const rutaUploadsUser = join(rutaUploads, 'user');
            mkdir(rutaUploadsUser, { recursive: true }, err => {
                if(err){
                    log('./logs/sys_err', err);
                    terminal().red(`Directorio: ${rutaUploadsUser}.......... Fallo\n`);

                    return false;
                }

                terminal().green(`Directorio: ${rutaUploadsUser}.......... OK!\n`);
            });
        }

        if(false === existsSync(join(rutaUploads, 'ima'))){
            const rutaUploadsIma = join(rutaUploads, 'ima');
            mkdir(rutaUploadsIma, { recursive: true }, err => {
                if(err){
                    log('./logs/sys_err', err);
                    terminal().red(`Directorio: ${rutaUploadsIma}.......... Fallo\n`);

                    return false;
                }

                terminal().green(`Directorio: ${rutaUploadsIma}.......... OK!\n`);
            });
        }
    });
} catch (error) {
    log('./logs/sys_err', error);
}