/**
 * Router 
 */
const Router = require('koa-router');
let router = module.exports = new Router();

/**
 * Controller
 */
const login = require('./controller/login');
const register = require('./controller/register');

// Authentication
require('./strategies');
const passport = require('koa-passport');



router.post('/register', register.post);
router.get('/login', login.get);

router.post('/login/local', function*(next){
    let ctx = this;

    // @see node_modules/koa-passport/lib/framework/koa.js for passport.authenticate
     // it returns the middleware to delegate
    let middleware =  passport.authenticate('local', function*(err, user, info){
        // only callback-form of authenticate allows to assign ctx.body=info if 401

        if(err) throw err;

        if(user === false){
            ctx.status = 401;
            ctx.body = info;
        }else{  
            yield ctx.login(user);
            ctx.body = {user: user.getInfoFields() };
        }
    }); 

    yield* middleware.call(this, next);

});