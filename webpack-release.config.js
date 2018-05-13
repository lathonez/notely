var path = require('path');
var webpack = require('webpack');
var loaders = require("./webpack-loaders");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var PATHS = {
  app: path.join(__dirname, 'src/index.ts'),
  build: path.join(__dirname, 'builds'),
  dist: path.join(__dirname, 'dist')
};

module.exports = {
  devtool: "source-map",
  debug: true,
  entry: [
    PATHS.app
  ],
  output: {
    path: PATHS.dist,
    filename: 'app.js'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json', '.scss']
  },
  module: {
    loaders: loaders
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("app.css"),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      verbose: true,
      minimize: true,
      mangle: false,
      compress: {
        warnings: true
      }
    })
  ]
};
