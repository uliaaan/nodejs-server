let Router = require('koa-router');
let config = require('config');
let add  = require('./controller/add');
let index = require('./controller/index');


let router = module.exports = new Router();

router.get('/', index.get);

router.post('/add', add.post);