var path = require('path');
var webpack = require('webpack');
var loaders = require("./webpack-loaders");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var precss       = require('precss');

var PATHS = {
  app: path.join(__dirname, 'src/index.ts'),
  build: path.join(__dirname, 'builds'),
  dist: path.join(__dirname, 'dist')
};

module.exports = {
  devtool: "eval-source-map",
  watch: true,
  cache: true,
  debug: true,
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:4100',
      'webpack/hot/dev-server',
      PATHS.app
    ]
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: PATHS.build,
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js',
    devtoolModuleFilenameTemplate: function(info){
      return "file:///"+info.absoluteResourcePath;
    }
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json', '.scss']
  },
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: "tslint"
      }
    ],
    loaders: loaders
  },
      postcss: function () {
        return [autoprefixer, precss];
    },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("app.css", { allChunks: true })
  ]
};
