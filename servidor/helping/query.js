"use strict";

const { entorno } = require('@confi/yargs'),
    { PAGINADO } = require('@confi')[entorno];

const empty = require('is-empty');

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

    find(){
        const { modelo, pagina, limite, filtro, value, select } = this;
        if(empty(filtro) || empty(value)){
            return modelo.find({'estado' : true}, select)
                .skip(pagina).limit(limite)
                .exec().then(row_s => {
                    return { row_s };
                });
        }


        let where = {};
        where[filtro] = value;
        return modelo.find(where).exec().then(row_s => { return { row_s }; });
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
    }
}

module.exports = new Query();