
const path = require('path');

module.exports = {
  entry: './client/components/App.react.js',
  resolve: {
    extensions: ['.js', '.react.js', '.json'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './client'),
    ],
  },
  output: {
    path: __dirname + '/public',
    filename: './App.js'
  },
  module: {
    rules: [
      {
        test: /\.react.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [ 'es2015', 'react' ]
        }
      }
    ]
  },
};
