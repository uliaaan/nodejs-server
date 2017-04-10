exports.AuthModal = require('./authModal');

const AuthForm = require('./authForm');

function init() {

    let form = new AuthForm(window.authOptions);

    document.getElementById("auth-form").appendChild(form.getElem());

}

init();