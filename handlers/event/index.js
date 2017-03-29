'use strict';

let mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

exports.init = function(app){

    // add methods BEFORE adding other auth routes (that may want these methods)

    
    app.use(mountHandlerMiddleware('/event', __dirname));

};