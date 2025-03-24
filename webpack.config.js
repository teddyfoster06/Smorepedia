const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './public/src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    fallback: {
      "fs": false,
      "zlib": require.resolve("browserify-zlib"), // Fallback for zlib
    "buffer": require.resolve("buffer/"), // Fallback for buffer module
    "stream": require.resolve("stream-browserify"), // Fallback for stream
    "crypto": require.resolve("crypto-browserify"), // Fallback for crypto
    "assert": require.resolve("assert/"), // Fallback for assert
    "util": require.resolve("util/"), // Fallback for util
    "http": require.resolve("stream-http"), // Fallback for http
    "https": require.resolve("https-browserify"), // Fallback for https
    "url": require.resolve("url/"), // Fallback for URL handling
    "os": require.resolve("os-browserify"), // Fallback for OS
    "path": require.resolve("path-browserify"),  
  },
  },
  output: {
    path: path.resolve(__dirname, './public/src'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './public/src'),
  },
};

