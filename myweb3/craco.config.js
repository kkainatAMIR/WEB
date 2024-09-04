const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        os: require.resolve('os-browserify/browser'),
        https: require.resolve('https-browserify'),
        stream: require.resolve('stream-browserify'),
        http: require.resolve('stream-http'),
        buffer: require.resolve('buffer/'),
        crypto: require.resolve('crypto-browserify'),
      };

      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        })
      );

      return webpackConfig;
    },
  },
};

