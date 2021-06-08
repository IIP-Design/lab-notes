const path = require( 'path' );

module.exports = {
  entry: {
    changelog: './js/changelog.js',
    main: './js/index.js',
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve( __dirname, 'assets/js' ),
  },
  module: {
    rules: [{ exclude: /node_modules/, test: /\.js$/, use: 'babel-loader' }],
  },
};
