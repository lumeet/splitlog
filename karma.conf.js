module.exports = function(config) {
  config.set({
    plugins: [
      require('karma-tap'),
      require('karma-phantomjs-launcher')
    ],

    basePath: 'static',
    frameworks: ['tap'],
    files: ['test.js'],

    reporters: ['dots'],
    browsers: ['PhantomJS'],
    singleRun: true
  })
};
