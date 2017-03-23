const Router = require('koa-router');
const login = require('./controller/login');

let router = module.exports = new Router();


router.get('/login', login.get);