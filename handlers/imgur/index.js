

let mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

exports.init = function(app){

    app.multipartParser.ignore.add('/imgur/upload');

    app.use(mountHandlerMiddleware('/imgur', __dirname));

};

