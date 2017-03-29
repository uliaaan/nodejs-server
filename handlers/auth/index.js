'use strict';



const mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

exports.init = function(app){

app.use(mountHandlerMiddleware('/auth', __dirname));

}