var Webpack        = require('webpack')
var webpack_config = require('./webpack')

module.exports = function (config) {
  config.set({

    browsers: [ 'Chrome' ],

    // Help CI
    browserNoActivityTimeout: 30000,

    frameworks: [ 'mocha', 'sinon-chai' ],

    logLevel: config.LOG_ERROR,

    files: [
      '../app/**/__tests__/*.test.js*',
      '../lib/**/__tests__/*.test.js*'
    ],

    preprocessors: {
      '../app/**/__tests__/*.js*': [ 'webpack', 'sourcemap' ],
      '../lib/**/__tests__/*.js*': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'mocha' ],

    client: {
      mocha: {
        timeout: 750
      }
    },

    webpack: {
      devtool: 'inline-source-map',
      resolve: webpack_config.resolve,
      module: webpack_config.module
    },

    webpackServer: {
      noInfo: true
    }
  })
}
