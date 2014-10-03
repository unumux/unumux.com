/// <vs BeforeBuild='build' Clean='clean-tmp' SolutionOpened='default' />
require('coffee-script/register');

// Specify, where is your Gulp config in CoffeeScript placed.
var gulpfile = 'Gulpfile.coffee';

// Execute CoffeeScript config.
var gulp = require('./' + gulpfile);