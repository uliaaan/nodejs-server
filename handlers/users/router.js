const Router = require('koa-router');


const router = module.exports = new Router();
const id = require('./controllers/id');


/**
 * REST API
 * /users/me   GET PATCH DEL
 * /users/:id  GET PATCH DEL (for admin or self)
 */

router.patch('/me', loadUserByReq, id.patch);

function* loadUserByReq(next) {

    //yield function(callback) {}

    this.params.user = this.req.user;
    yield* next;
}