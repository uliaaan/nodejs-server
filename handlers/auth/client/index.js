exports.AuthModal = require('./authModal');

const AuthFrom = require('./authForm');


function init(){
    let form = new AuthFrom(window.authOptions);

    document.getElementById("auth-form").appendChild(form.getElem());

}

init();