'use strict';

const mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

/**
 *
 * EXPORTS
 * */
exports.mustBeAuthenticated = require('./lib/mustBeAuthenticated');
exports.mustNotBeAuthenticated = require('./lib/mustNotBeAuthenticated');

exports.init = function(app){











app.use(mountHandlerMiddleware('/auth', __dirname));

};