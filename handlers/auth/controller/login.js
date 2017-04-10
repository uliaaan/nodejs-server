const path = require('path');


exports.get = function*() {

    this.locals.headTitle = "Авторизация";

    // logged in?
    if (this.user) {
        this.redirect('/');
        return;
    }

    this.locals.authOptions = {
        successRedirect: this.flash.successRedirect || '/',
        message: this.flash.messages && this.flash.messages[0]
    };

    this.body = this.render('login');

};