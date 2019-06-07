const rolesValide = {
    'values' : ['ADMIN_ROLE', 'USER_ROLE', 'SUPER_ROLE'],
    'message' : '{VALUE} no es un role valido'
}

module.exports = {
    'nombre' : {
        'type' : String,
        'required' : [true, 'Nombre Usuario Requerido']
    },
    'email' : {
        'type' : String,
        'required' : [true, 'Correo Usuario Requerido'],
        'unique': true
    },
    'password' : {
        'type' : String,
        'required' : true
    },
    'img' : {
        'type' : String,
        'required' : false
    },
    'role' : {
        'type' : String,
        'required' : true,
        'default' : 'USER_ROLE',
        'enum' : rolesValide
    },
    'estado' : {
        'type' : Boolean,
        'required' : true,
        'default' : true
    },
    'google' : {
        'type' : Boolean,
        'required' : true,
        'default' : false
    },
};