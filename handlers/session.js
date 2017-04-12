/*
 модуль для сессий
 когда управление проходит через него он делает this.session и next
 
 и мы можем в него писать уже после всех middlewares
 если this.session изменилась то записываем в базу

 у нас есть koa-generic-session
 и мы говорим ей что в качестве хранилища ссесий нужно исп mongooseStore
 */
const mongoose = require('mongoose');
const session = require('koa-generic-session');
const mongooseStore = require('koa-session-mongoose');
const config = require('config');

exports.init = function(app) {

    let options = {
        store: new mongooseStore({
            model: 'Session',
            // expires in DB is same as cookie maxAge, but in seconds
            expires: config.auth.session.cookie.maxAge / 1000
        })
    };

    let dataParams = Object.assign({}, options, config.auth.session);

    app.use(session(dataParams));
    app.keys = config.appKeys;  // needed for cookie-signing

};

/**
 *  когда управление проходит через этот мидделвер then
 *  this.session = ...koa.sid
 *  yield next
 *  потом
 *  если if(в this.session чтото появилось сохранить в базе)
 */