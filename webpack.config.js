var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    path.resolve('src/js/resume.js'),
    path.resolve('src/styles/main.scss')
  ],
  output: {
      path: path.resolve(__dirname),
      filename: 'dist/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ],
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?importLoaders=1'
        })
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract(
          [
            'css-loader',
            'sass-loader'
          ]
        )
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'dist/style.css',
      allChunks: true
    })
  ]
};
