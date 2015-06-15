var Webpack        = require('webpack')
var webpack_config = require('./webpack.config')

module.exports = function (config) {
  config.set({

    browsers: [ 'Chrome' ],

    // Help CI
    browserNoActivityTimeout: 30000,

    frameworks: [ 'mocha', 'sinon-chai' ],

    files: [
      { pattern: 'test/*.json', watched: false, included: false, served: true },
      './src/**/__tests__/*.test.js*',
    ],

    preprocessors: {
      './src/**/__tests__/*.js*': [ 'webpack', 'sourcemap' ]
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
      resolve : webpack_config.resolve,

      module: {
        noParse: webpack_config.module.noParse,
        loaders: [{
          test    : /\.jsx*$/,
          exclude : /node_modules/,
          loader  : 'babel',
          query   : {
            auxiliaryCommentBefore: "istanbul ignore next",
            optional: ["runtime"]
          }
        }],
        postLoaders: [
          {
            test: /\.jsx*$/,
            exclude: /(__tests__|node_modules)\//,
            loader: 'istanbul-instrumenter'
          }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }

  })
}
