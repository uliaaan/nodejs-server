/**
 * Created by jumbot on 11.04.17.
 */
let Router = require('koa-router');

let index = require('./controller/index');

let router = module.exports = new Router();

router.get('/', index.get);

router.get('/:profileName/:tab?', index.get);