// must be above router, because router uses auth (which uses user)
// cyclic require here
"use strict";
const config = require('config');
const mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

/**
* EXPORTS
* */
exports.User = require('./models/user');

exports.init = function (app) {

    app.use(mountHandlerMiddleware('/users', __dirname));

};