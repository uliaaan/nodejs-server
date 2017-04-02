"use strict";

let mongoose = require('mongoose');
const Article = require('tutorial').Article;
const transliterate = require('textUtil/transliterate');
const log = require('log')();

exports.get = function*(next) {


    this.locals.sitetoolbar = true;
    /*logged in?
     if(this.user){
     this.redirect('/');
     return ;
     }
     */

    this.locals.headTitle = "Добавление события";

    this.body = this.render('index', this.locals);


};


exports.post = function*(next) {

    let error = "";
    this.locals.sitetoolbar = true;
    let fields = this.request.body;

    if (!fields.title) {
        error = "Заголовок мероприятия не может быть пустым!";
    }

    if (!fields.content) {
        error = "Введите описание мероприятия";
    }

    if (error) {
        this.body = this.render("index", {
            error: error
        });

        return;
    }

    const data = {
        isFolder: true
    };

    //data.parent = "212";
    data.weight = 4;
    data.slug = transliterate(fields.title);

    data.title = fields.title;
    data.content = fields.content;
    data.githubLink = "ddddd";


    const folder = new Article(data);

    try {
        yield folder.persist();
    } catch(e) {
        if (e.name == 'ValidationError') {
            try {
                if (e.errors.email.type == "notunique") {
                    e.errors.email.message += ' Если он ваш, то можно <a data-switch="login-form" href="#">войти</a> или <a data-switch="forgot-form" href="#">восстановить пароль</a>.';
                }
            } catch (ex) { /* e.errors.email is undefined, that's ok */ }
            this.renderError(e);
            return;
        } else {
            this.throw(e);
        }
    }

    this.locals.message = 'Ваше событие добавлено!';
    this.status = 201;
    this.body = this.render('index', this.locals);
};

