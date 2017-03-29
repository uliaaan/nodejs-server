const path = require('path');

exports.get = function* (){


    this.locals.headTitle = "Авторизация";

    this.locals.authOptions = {
        successRedirect: this.flash.successRedirect || '/',
        message: this.flash.message && this.flash.message[0]        
    };

    this.body = this.render('login');


};