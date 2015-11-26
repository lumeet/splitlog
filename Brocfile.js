const babel      = require('broccoli-babel-transpiler');
const funnel     = require('broccoli-funnel');
const webpack    = require('broccoli-webpack');
const mergeTrees = require('broccoli-merge-trees');
const glob       = require('glob');

const indexFile = funnel('js', {
  include: ['index.html', 'splitlog.css']
});

const libFiles = babel('js/lib', {
  stage: 0,
  modules: 'amd'
});

const testFiles = babel('js/', {
  stage: 0,
  modules: 'amd'
});

const lib = webpack(libFiles, {
  entry: './splitlog.js',
  output: { filename: 'js/splitlog.js' }
});

const test = webpack(testFiles, {
  entry: glob.sync('test/*_test.js', { cwd: './js' })
             .map(function(p) { return './' + p; }),
  output: { filename: 'test.js' },
  node: { fs: 'empty' },
});

module.exports = mergeTrees([lib, test, indexFile]);
