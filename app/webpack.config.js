var webpack = require('webpack');

module.exports = {
  entry: [
    './admin/index.js'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
   watchOptions: {
    aggregateTimeout: 1000,
    poll: 1000
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': process.env.NODE_ENV
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ]
};