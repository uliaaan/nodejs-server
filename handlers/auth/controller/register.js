
let User = require('users').User;


exports.post = function* (next) {

    let verifyEmailToken = Math.random().toString(36).slice(2, 10);

    let user = new User({
        email: this.request.body.email.toLowerCase(),
        displayName: this.request.body.displayName,
        password: this.request.body.password,
        verifiedEmail: false,
        verifyEmailToken: verifyEmailToken,
        verifyEmailRedirect: this.request.body.successRedirect
    });

    try {
        yield user.persist();
    } catch (e) {
        if (e.name === 'ValidationError') {
            try {
                if (e.errors.email.type == "notunique") {
                    e.errors.email.message += ' Если он ваш, то можно <a data-switch="login-form" href="#">войти</a> или <a data-switch="forgot-form" href="#">восстановить пароль</a>.';
                }
            } catch (ex) {/* e.errors.email is undefined, that's ok */ }
            this.renderError(e);
            return;
        } else {
            this.throw(e);
        }
    }


  // We're here if no errors happened
  this.status = 201; 
  this.body = '';




};


