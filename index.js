var Metalsmith  = require('metalsmith');
var collections = require('metalsmith-collections');
var layouts     = require('metalsmith-layouts');
var markdown    = require('metalsmith-markdown');
var permalinks  = require('metalsmith-permalinks');


Metalsmith(__dirname)
  .source('./posts')
  .destination('./journal')
  .clean(true)
  .use(collections({
    posts: 'posts/*.md'
  }))
  .use(markdown())
  .use(permalinks({
    relative: false
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: 'layouts'
  }))
  .build(function(err) {
    if (err) throw err;
  });