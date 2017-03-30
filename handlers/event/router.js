"use strict";
let Router = require('koa-router');
let config = require('config');
let index = require('./controller/index');


let router = module.exports = new Router();

router.get('/', index.get);

router.post('/add', index.post);