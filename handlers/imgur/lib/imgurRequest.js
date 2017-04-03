const config = require('config');
const request = require('request');
const log = require('log')();


module.exports = function*(serviceName, options){
    options = Object.assign({
        method:  'POST',
        url:     config.imgur.url + serviceName,
        headers: {'Authorization': 'Client-ID ' + config.imgur.clientId},
        json:    true
    }, options);

    let response = yield function(callback) {
    request(options, function(error, response) {
      callback(error, response);
    });
  };

    if(response.status != 200 && response.statusCode != 400){
        log.error("Imgur error", {res: response});
        throw new Error("Error communicating with imgur service.");
    }

    return response.body;
};