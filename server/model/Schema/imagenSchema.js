const { Schema } = require('@baseserver/conn');

module.exports = {
    'file' : {
        'type' : String,
        'required' : [true, 'Nombre de Archivo Requerido'],
        'unique': true
    },
    'original' : {
        'type' : String,
        'required' : [true, 'Nombre de Archivo Original Requerido']
    },
    'tag' : {
        'type' : String,
        'required' : true
    },
    'fecha' : {
        'type' : Schema.type.Date,
        'required' : true
    },
    'estado' : {
        'type' : Boolean,
        'required' : true,
        'default' : true
    },
};