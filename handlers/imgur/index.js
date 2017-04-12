
let mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

exports.imgurImage = require('./models/imgurImage');

exports.init = function(app){

    app.multipartParser.ignore.add('/imgur/upload');

    app.use(mountHandlerMiddleware('/imgur', __dirname));

};

