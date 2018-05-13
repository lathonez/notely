var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = [
  {
    test: /\.ts$/,
    loader: 'ts-loader'
  },
  {
    test: /\.html$/,
    loader: 'html-loader'
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader"),
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader?outputStyle=expanded")
  }
];
