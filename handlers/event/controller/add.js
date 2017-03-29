"use strict";

let mongoose = require('mongoose');
const Article = require('tutorial').Article;
const log = require('log')();

exports.get = function *get(next){

    log.debug("title", this.request.title);


};
