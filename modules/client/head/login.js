/**
 * Created by jumbot on 22.03.17.
 */
'use strict';
let Modal = require('./modal');
let Spinner = require('client/spinner');

document.addEventListener('click', openLoginForm);

function openLoginForm(event) {

    if(!event.target.hasAttribute('data-action-login')) return;

    event.preventDefault();

    login();
}

function login() {
    let modal = new Modal({hasClose:false, mixClass: 'login-modal'});
    let spinner = new Spinner();
    modal.setContent(spinner.elem);
    spinner.start();

    require.ensure('auth/client/authModal', function() {
        modal.remove();
        var AuthModal = require('auth/client/authModal');
        new AuthModal();
    }, 'authClient');

}

module.exports = login;