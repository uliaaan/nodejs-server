/**
 * Created by jumbot on 23.03.17.
 */
'use strict';

const xhr = require('client/xhr');
const Spinner = require('client/spinner');
const delegate = require('client/delegate');

const loginForm = require('../templates/login-form.jade');
const registerForm = require('../templates/registerForm.jade');

const clientRender = require('client/clientRender');



/**
 * Options:
 *   - callback: function to be called after successful login (by default - go to successRedirect)
 *   - message: form message to be shown when the login form appears ("Log in to leave the comment")
 *   - successRedirect: the page to redirect (current page by default)
 *       - after immediate login
 *       - after registration for "confirm email" link
 */
class AuthForm {

    constructor(options) {
        this.options = options;
    }


    render() {
        this.elem = document.createElement('div');
        this.elem.innerHTML = clientRender(loginForm, this.options);


        this.initEventHandlers();
    }


    getElem() {
        if (!this.elem) this.render();
        return this.elem;
    }


    request(options) {
        let request = xhr(options);

        request.addEventListener('loadstart', function() {
            let onEnd = this.startRequestIndication();
            request.addEventListener('loadend', onEnd);

        }.bind(this));

        return request;
    }


    startRequestIndication() {
        this.elem.classList.add('modal-overlay_light');
        let self = this;

        let submitButton = this.elem.querySelector('[type="submit"]');

        if (submitButton) {
            let spinner = new Spinner({
                elem: submitButton,
                size: 'small',
                class: '',
                elemClass: 'button_loading'
            });
            spinner.start();
        }

        return function onEnd() {
            self.elem.classList.remove('modal-overlay_light');
            if (spinner) spinner.stop();
        };

    }

    initEventHandlers() {
        this.delegate('[data-switch="register-form"]', 'click', function(event) {
            event.preventDefault();
            this.elem.innerHTML = clientRender(registerForm, this.options);
        });

        this.delegate('[data-switch="login-form"]', 'click', function(event) {
            event.preventDefault();
            this.elem.innerHTML = clientRender(loginForm, this.options);
        });

        this.delegate('[data-form="register"]', 'submit', function(event) {
            event.preventDefault();
            console.log(event.target);
            this.submitRegisterForm(event.target);

        });


    }

    submitRegisterForm(form) {





    }


}

delegate.delegateMixin(AuthForm.prototype);

module.exports = AuthForm;