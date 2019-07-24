const { Schema } = require('@baseserver/conn');

module.exports = {
    'producto' : {
        'type' : String,
        'required' : [true, 'Nombre de Producto Requerido'],
        'unique': true
    },
    'precio' : {
        'type' : Number,
        'required' : [true, 'Precio de Producto Requerido']
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
    'categorias' : {
        'type' : Schema.Types.ObjectId,
        'required' : true,
        'ref': "categorias"
    },
    'estado' : {
        'type' : Boolean,
        'required' : true,
        'default' : true
    },
};