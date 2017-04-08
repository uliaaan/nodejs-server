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
        this.showInputError;

        if (!options.successRedirect) {
            options.successRedirect = window.STATUS_CODE < 300 ? window.location.href : '/';
        }
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

    	
  successRedirect() {
    if(window.location.href === this.options.successRedirect){
        window.location.reload();
    }else{
        window.location.href = this.options.successRedirect;
    }
  }

    request(options) {
        let request = xhr(options);

        request.addEventListener('loadstart', function () {
            let onEnd = this.startRequestIndication();
            request.addEventListener('loadend', onEnd);

        }.bind(this));

        return request;
    }


    clearFormMessages() {

        [].forEach.call(this.elem.querySelectorAll('.text-input_invalid'), function (elem) {
            elem.classList.remove('text-input_invalid');
        });

        [].forEach.call(this.elem.querySelectorAll('.text-input__err'), function (elem) {
            elem.remove();
        });

        // clear form-wide notification
        this.elem.querySelector('[data-notification]').innerHTML = '';
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
        this.delegate('[data-switch="register-form"]', 'click', function (event) {
            event.preventDefault();
            this.elem.innerHTML = clientRender(registerForm, this.options);
        });

        this.delegate('[data-switch="login-form"]', 'click', function (event) {
            event.preventDefault();
            this.elem.innerHTML = clientRender(loginForm, this.options);
        });

        this.delegate('[data-form="register"]', 'submit', function (event) {
            event.preventDefault();
            console.log(event.target);
            this.submitRegisterForm(event.target);

        });
    }


    submitRegisterForm(form) {

        this.clearFormMessages();

        let hasError = false;

        if (!form.elements.email.value) {
            hasError = true;
            this.showInputError(form.email, 'Введите, пожалуста, email.');
        }

        if (!form.elements.displayName.value) {
            hasErrors = true;
            this.showInputError(form.elements.displayName, 'Введите, пожалуста, имя пользователя.');
        }

        if (!form.elements.password.value) {
            hasErrors = true;
            this.showInputError(form.elements.password, 'Введите, пожалуста, пароль.');
        }


        if (hasError) return

        let payload = new FormData(form);
        payload.append("successRedirect", this.options.successRedirect);

        let request = this.request({
            method: "POST",
            url: 'auth/register',
            normalStatuses: [201, 400],
            body: payload
        });


        let self = this;
        request.addEventListener('success', function (event) {
            console.log(event);

            if (this.status == 201) {
                self.elem.innerHTML = clientRender(loginForm, self.options);
                self.showFormMessage({
                    html: "<p>С адреса notify@javascript.ru отправлено письмо со ссылкой-подтверждением.</p>" +
                    "<p><a href='#' data-action-verify-email='" + form.elements.email.value + "'>перезапросить подтверждение.</a></p>",
                    type: 'success'
                });
                return;
            }

            if (this.status == 400) {
                for (var field in event.result.errors) {
                    self.showInputError(form.elements[field], event.result.errors[field]);
                }
                return;
            }

            self.showFormMessage({ html: "Неизвестный статус ответа сервера", type: 'error' });
        });
    }


    showFormMessage(message) {

        let html = message.html;

        if (html.indexOf('<p>') !== 0) {
            html = '<p>' + html + '</p>';
        }

        let type = message.type;

        if (['info', 'error', 'warning', 'success'].indexOf(type) == -1) {
            throw new Error("Unsupported type: " + type);
        }

        let container = document.createElement('div');
        container.className = 'login-form__' + type;
        container.innerHTML = html;

        this.elem.querySelector('[data-notification]').innerHTML = '';
        this.elem.querySelector('[data-notification]').initEventHandlers = container;
    }



}

delegate.delegateMixin(AuthForm.prototype);

module.exports = AuthForm;