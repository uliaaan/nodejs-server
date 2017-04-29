const Router = require('koa-router');
const mongoose = require('mongoose');
const User = require('./models/user');


const router = module.exports = new Router();

const id = require('./controllers/id');

/**
 * REST API
 * /users/me   GET PATCH DEL
 * /users/:id  GET PATCH DEL (for admin or self)
 */

router.get('/me', loadUserByReq, id.get);
router.patch('/me', loadUserByReq, id.patch);
router.del('/me',  loadUserByReq, id.del);


function* loadUserByReq(next) {

    //yield function(callback) {}

    this.params.user = this.req.user;
    yield* next;
}