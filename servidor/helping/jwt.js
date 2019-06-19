"use strict";
require('module-alias/register');

const { entorno } = require('@confi/yargs'),
    { SECRET_TOKEN, CADUCA } = require('@confi')[entorno];

const { sign, verify } = require('jsonwebtoken');

class Jwt {
    constructor(){
        this.datas = null;
        this.caducidad = CADUCA;
    }

    set Datas(data_s){
        this.datas = data_s;
    }

    set Caducidad(time){
        this.caducidad = time;
    }

    setDatas(data_s){
        this.datas = data_s;

        return this;
    }

    setCaducidad(time){
        this.caducidad = time;

        return this;
    }

    token(){
        const { datas, caducidad:expiresIn } = this;
        return new Promise((res, rej) => {
            sign({ datas }, SECRET_TOKEN, { expiresIn }, (err, token) => {
                if(err){
                    rej(err);

                    return false;
                }
                    
                res(token);
            });
        });
    }

    valida(){
        return verify(this.datas, SECRET_TOKEN);
    }

    end(){
        this.datas = null;
        this.caducidad = CADUCA;
    }
}

module.exports = new Jwt();