/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
function onSignIn(googleUser) {
    const token = googleUser.getAuthResponse().id_token;

    const options = {
        'body' : JSON.stringify( { token }),
        'method' : 'POST',
        'headers' : { 'Content-Type': 'application/json' }
    };

    fetch('./token/sign/in', options)
        .then(function(res) {
            if(res.ok)
                return res.json();

            return false;
        })
        .then(function(json) {
            if(false === json.estatus || [] === json.result){
                alert('Autentificacion fallida');

                return false;
            }

            return json.result;
        })
        .then(function(res){
            console.log(res);
        });
}