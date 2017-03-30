"use strict";

let mongoose = require('mongoose');
const Article = require('tutorial').Article;
const log = require('log')();

exports.post = function*(next){

    log.debug("title", this.request.body.title);


};
