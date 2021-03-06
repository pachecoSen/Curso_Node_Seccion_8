"use strict";
require('module-alias/register');

const { entorno } = require('@confi/yargs'),
    { PAGINADO } = require('@confi')[entorno];

const empty = require('is-empty'),
    _ = require('underscore');

class Query {
    constructor() {
        this.limite = PAGINADO;
        this.pagina = 1;
    }

    set Modelo(mod){
        this.modelo = mod;
    }
    
    set Limite(limit){
        if(!empty(limit))
            this.limite = Number(limit);
    }

    set Pagina(pag){
        if(!empty(pag))
            this.pagina = (Number(pag) - 1) * this.limite;
    }

    set Filtro(_filtro){
        this.filtro = _filtro;
    }

    set Value(val){
        this.value = val;
    }

    set Select(_select){
        this.select = _select;
    }

    set Join(_table){
        this.join = _table;
    }

    setJoin(_table){
        this.join = _table;

        return this;
    }

    setSelect(_select){
        this.select = _select;

        return this;
    }

    setValue(val){
        this.value = val;

        return this;
    }

    setFiltro(_filtro){
        this.filtro = _filtro;

        return this;
    }

    setModelo(mod){
        this.modelo = mod;

        return this; 
    }

    setLimite(limit){
        if(!empty(limit))
            this.limite = Number(limit);

        return this;
    }

    setPagina(pag){
        if(!empty(pag))
            this.pagina = (Number(pag) - 1) * this.limite;

        return this;
    }

    search(){
        let { modelo, filtro, value, select, join:joinTable } = this;
        if(empty(filtro) && empty(value)){
            let sql = modelo.find({'estado' : true}, select);
            if(!empty(joinTable))
                sql = sql.populate(joinTable);

            return sql.exec().then(row_s => { return { row_s };});
        }

        let where = !_.isObject(filtro) ? {} : filtro;
        if(!_.isObject(filtro))
            where[`${filtro}`] = value;

        let sql = modelo.find(where, select);
        if(!empty(joinTable))
            sql = sql.populate(joinTable);

        return sql.exec().then(row_s => { return { row_s }; });
    }

    find(){
        let { modelo, pagina, limite, filtro, value, select } = this;
        if(empty(filtro) && empty(value)){
            return modelo.find({'estado' : true}, select)
                .skip(pagina).limit(limite)
                .exec().then(row_s => {
                    return { row_s };
                });
        }

        let where = !_.isObject(filtro) ? {} : filtro;
        if(!_.isObject(filtro))
            where[`${filtro}`] = value;

        return modelo.find(where, select).exec().then(row_s => { return { row_s }; });
    }

    inf(){
        let { modelo, limite:no_rows, pagina:item } = this;
        return modelo.find().estimatedDocumentCount()
            .then(count => {
                item++;
                const all = Math.ceil(count/no_rows);

                return { 'info' : { count, no_rows, 'pagina' : { item, all } } };
            });
    }

    end(){
        this.limite = PAGINADO;
        this.pagina = 1;
        this.modelo = null;
        this.filtro = null;
        this.value = null;
        this.select = '';
        this.join = null;
    }
}

module.exports = new Query();