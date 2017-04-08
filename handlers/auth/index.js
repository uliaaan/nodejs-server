'use strict';

const mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

/**
 *
 * EXPORTS
 * */
exports.mustBeAuthenticated = require('./lib/mustBeAuthenticated');
exports.mustNotBeAuthenticated = require('./lib/mustNotBeAuthenticated');

exports.init = function(app){

    require('./strategies');

    app.use(function* (next) {
      
      
      this.authAndRedirect = function(url) {
        this.addFlashMessage('info', 'Для доступа к этой странице нужна авторизация.');
         this.newFlash.successRedirect = url;
        this.redirect('/auth/login');
      };


       yield* next; 
    });

    app.use(mountHandlerMiddleware('/auth', __dirname));

};