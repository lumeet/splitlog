const babel = require('broccoli-babel-transpiler');
const webpack = require('broccoli-webpack');

const files = babel('js', {
  stage: 0,
  modules: 'amd'
});

const main = webpack(files, {
  entry: './splitlog.js',
  output: { filename: 'splitlog.js' }
});

module.exports = main;
