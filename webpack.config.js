
const path = require('path');

module.exports = {
  entry: {
    notes: './client/components/notes/Notes.react.js',
    calendar: './client/components/calendar/Calendar.react.js',
    //contacts: './client/components/contacts/Contacts.react.js',
  },
  resolve: {
    extensions: ['.js', '.react.js', '.json'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './client/js'),
      path.resolve(__dirname, './client/components'),
    ],
  },
  output: {
    path:path.resolve( __dirname, 'public'),
    filename: './[name].js'
  },
  module: {
    rules: [
      {
        test: /\.react\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [ 'es2015', 'react' ]
        }
      }
    ]
  },
};
