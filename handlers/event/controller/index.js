"use strict";

let mongoose = require('mongoose');
const Article = require('tutorial').Article;

exports.get = function *get(){

    let locals = {};

    /*logged in?
    if(this.user){
        this.redirect('/');
        return ;
    }
    */

    locals.headTitle = "Add new event";

    this.body = this.render('index', locals);


};
