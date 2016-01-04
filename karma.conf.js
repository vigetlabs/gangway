var Webpack = require('webpack')

module.exports = function (config) {
  config.set({

    browsers: [ 'Chrome' ],

    // Help CI
    browserNoActivityTimeout: 30000,

    frameworks: [ 'mocha', 'sinon-chai' ],

    files: [
      { pattern: './test/*.json', watched: false, included: false, served: true },
      './test/*.test.js',
    ],

    preprocessors: {
      './test/*.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'mocha', 'coverage' ],

    client: {
      mocha: {
        timeout: 750
      }
    },

    coverageReporter: {
      dir    : process.env.CIRCLE_ARTIFACTS || 'coverage',
      type   : 'html',
      subdir : '.'
    },

    webpack: {
      devtool : 'inline-source-map',
      module: {
        loaders: [{
          test: /\.json$/,
          loader: 'json'
        }],
        postLoaders: [{
          test: /\.js$/,
          exclude: /(__tests__|node_modules)\//,
          loader: 'istanbul-instrumenter'
        }]
      }
    },

    webpackServer: {
      noInfo: true
    }

  })
}
