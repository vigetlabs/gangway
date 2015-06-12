var Webpack        = require('webpack')
var webpack_config = require('./webpack.config')

module.exports = function (config) {
  config.set({

    browsers: [ 'Chrome' ],

    // Help CI
    browserNoActivityTimeout: 30000,

    frameworks: [ 'mocha', 'sinon-chai' ],

    logLevel: config.LOG_ERROR,

    files: [
      './src/**/__tests__/*.test.js*'
    ],

    preprocessors: {
      './src/**/__tests__/*.js*': [ 'webpack', 'sourcemap' ]
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
