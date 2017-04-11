/**
 * Created by jumbot on 11.04.17.
 */
let mountHandlerMiddleware = require('lib/mountHandlerMiddleware');


exports.init = function(app) {
    app.use(mountHandlerMiddleware('/profile', __dirname));
};