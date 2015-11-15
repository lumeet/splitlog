const babel       = require('broccoli-babel-transpiler');
const webpack     = require('broccoli-webpack');
const merge_trees = require('broccoli-merge-trees');
const glob        = require('glob');

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
  output: { filename: 'splitlog.js' }
});

const test = webpack(testFiles, {
  entry: glob.sync('test/*_test.js', { cwd: './js' })
             .map(function(p) { return './' + p; }),
  output: { filename: 'test.js' },
  node: { fs: 'empty' },
});

module.exports = merge_trees([lib, test]);
