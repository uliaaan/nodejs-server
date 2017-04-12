const passport = require('koa-passport');
const User = require('users').User;

passport.serializeUser((user, done) => {
    done(null, user.id); // uses _id as idFieldd
});

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

// auto logs in X-Test-User-Id when testing
exports.init = function(app) {

    app.use(function* cleanEmptySessionPassport(next) {
        yield* next;
        if (this.session && this.session.passport && Object.keys(this.session.passport).length === 0) {
            delete this.session.passport;
        }
    });

    app.use(function* defineUserGetter(next) {
        Object.defineProperty(this, 'user', {
            get: function() {
                return this.req.user;
            }
        });
        yield* next;
    });

    app.use(passport.initialize());
    app.use(passport.session());

    //ADD TEST !!!!!!!!!!!!!!!!!!!!!!!!!!!!

};