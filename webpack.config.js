const path = require( 'path' );

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve( __dirname, 'assets/js' ),
  },
  module: {
    rules: [{ exclude: /node_modules/, test: /\.js$/, use: 'babel-loader' }],
  },
};
