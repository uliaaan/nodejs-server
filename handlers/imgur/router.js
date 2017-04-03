
const Router = require('koa-router');
const upload = require('./controllers/upload');

let router = module.exports = new Router();

router.post('/upload', upload.post);