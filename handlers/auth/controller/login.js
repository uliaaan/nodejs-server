const path = require('path');

exports.get = function*() {


    this.locals.headTitle = "Авторизация";

    // logged in?
    if (this.user) {
        this.redirect('/');
        return;
    }
    
        this.locals.authOptions = {
            successRedirect:  '/',
            message: this.flash.message && this.flash.message[0]        
        };
    
    this.body = this.render('login');

};