"use strict";

let mongoose = require('mongoose');
const Article = require('tutorial').Article;

exports.get = function *get(){


    this.locals.sitetoolbar = true;
    /*logged in?
    if(this.user){
        this.redirect('/');
        return ;
    }
    */

    this.locals.headTitle = "Add new event";

    this.body = this.render('index', this.locals);


};
