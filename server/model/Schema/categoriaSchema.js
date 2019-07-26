const { Schema } = require('@baseserver/conn');

module.exports = {
    'categoria' : {
        'type' : String,
        'required' : [true, 'categoria Requerido'],
        'unique': true
    },
    'descripcion' : {
        'type' : String,
        'required' : false,
        'default' : 'Sin Descripcion'
    },
    'usuarios' : {
        'type' : Schema.Types.ObjectId,
        'required' : true,
        'ref': "usuarios"
    },
    'estado' : {
        'type' : Boolean,
        'required' : true,
        'default' : true
    },
};