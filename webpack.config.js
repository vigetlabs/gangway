var Webpack = require('webpack')
var isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  devtool: isDevelopment ? 'inline-source-map' : 'source-map',

  plugins: [
    // Note: we use babel for environment variables, however this is necessary
    // for node_modules
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],

  resolve: {
    extensions: ['', '.js', '.json']
  },

  node: {
    buffer: false,
    process: false
  },

  module: {
    loaders: [{
      test    : /\.json$/,
      loader  : 'json'
    }]
  }
}
