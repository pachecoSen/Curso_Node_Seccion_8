/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
function onSignIn(googleUser) {
    const token = googleUser.getAuthResponse().id_token;
    console.log(token)
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
            if(false === json.estatus){
                alert('Autentificacion fallida');

                return false;
            }

            return json.token;
        })
        .then(function(token){
            console.log(token);
        });
}