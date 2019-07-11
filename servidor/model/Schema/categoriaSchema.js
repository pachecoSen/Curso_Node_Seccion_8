const { Schema } = require('@baseserver/conn');

module.exports = {
    'categoria' : {
        'type' : String,
        'required' : [true, 'categoria Requerido']
    },
    'descripcion' : {
        'type' : String,
        'required' : false,
        'default' : 'Sin Descripcion'
    },
    'usuario' : {
        'type' : Schema.Types.ObjectId,
        'required' : true
    },
    'estado' : {
        'type' : Boolean,
        'required' : true,
        'default' : true
    },
};