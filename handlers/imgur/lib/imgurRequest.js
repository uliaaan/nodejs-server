const config = require('config');
const request = require('request');
const log = require('log')();


module.exports = function*(serviceName, options){
    options = Object.assign({
        method:  'POST',
        url:     config.secret_dev.imgur.url + serviceName,
        headers: {'Authorization': 'Client-ID ' + config.secret_dev.imgur.clientId},
        json:    true
    }, options);

    log.debug("response Options", JSON.stringify(options));

    let response = yield function(callback) {
    request(options, function(error, response) {
      callback(error, response);
    });
  };
    log.debug("response Imgur", JSON.stringify(response ));

    if(response.body.status != 200 && response.statusCode != 400){
        throw new Error("Error communicating with imgur service.");
    }

    return response.body;
};