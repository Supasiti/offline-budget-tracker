// const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require('path');

const config = {
  mode: 'development',

  // add entry points for JavaScript files for the three pages, home, detail, and favorites.
  entry: './src/index.js',
  output: {
    path: __dirname + '/public/dist',
    filename: 'index.bundle.js',
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
module.exports = config;
