
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules\/(?!@metamask\/safe-event-emitter)/,
      },
    ],
  },
  ignoreWarnings: [
    // Ignore warnings about source maps for specific modules
    {
      module: /source-map-loader/,
      message: /Failed to parse source map/,
    },
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
