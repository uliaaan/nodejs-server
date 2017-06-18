'use strict';

const mongoose = require('mongoose');
const Article = require('../models/article');
const Task = require('../models/task');
const _ = require('lodash');
const ArticleRenderer = require('../renderer/articleRenderer');
const CacheEntry = require('cache').CacheEntry;
const log = require('log')();
exports.get = function *get(next) {

  this.locals.sitetoolbar = true;
  this.locals.siteToolbarCurrentSection = "tutorial";
  this.locals.NowGo = "Уже идут";
  this.locals.LaterGO = "Скоро начнутся";
  this.locals.EveningGO = "Скоро начнутся";
  this.locals.TommorowGO = "Завтра";


  var tutorial = yield* CacheEntry.getOrGenerate({
    key:  'tutorial:frontpage',
    tags: ['article']
  }, renderArticles.bind(this), process.env.TUTORIAL_EDIT);

  if (!tutorial.length) {
    this.throw(404, "Database is empty?"); // empty db
  }
   this.locals.content = tutorial;
  
   this.body = this.render('frontpage', this.locals);
};


function* renderArticles(){

  const articles = yield Article.find({}).exec();
  if(!articles){
    return null;
  }
  this.log.debug("article", articles._id);
  return articles;
}




// content
// metadata
// modified
// title
// isFolder
// prev
// next
// path
// siblings
function* renderTutorial() {
  const tree = yield* Article.findTree();

  var treeRendered = yield* renderTree(tree);
  log.debug("treeRendered",treeRendered);

  // render top-level content
  for (var i = 0; i < treeRendered.length; i++) {
    var child = treeRendered[i];
    yield* populateContent(child);
  }


  return treeRendered;

}


function* renderTree(tree) {
  var children = [];

  for (var i = 0; i < tree.children.length; i++) {
    var child = tree.children[i];

    var childRendered = {
      id: child._id,
      url:   Article.getUrlBySlug(child.slug),
      title: child.title
    };

    if (child.isFolder) {
      childRendered.children = yield* renderTree(child);
    }

    children.push(childRendered);

  }
  return children;
}


function* populateContent(articleObj) {

  var article = yield Article.findById(articleObj.id).exec();

  var renderer = new ArticleRenderer();

  var rendered = yield* renderer.renderWithCache(article);
  
  articleObj.content = rendered.content;
}
