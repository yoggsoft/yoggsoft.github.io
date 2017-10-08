var path = require('path');

module.exports = {
  entry: path.dirname('src/js/resume.js'),
  output: {
      path: path.dirname('/'),
      filename: "bundle.js"
  },
  module: {
  // loaders: [
  //     { test: /\.css$/, loader: "style!css" }
  // ]
  loaders: [
      {
        test: /\.es6$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
