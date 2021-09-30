const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
  mode: 'development',

  // add entry points for JavaScript files for the three pages, home, detail, and favorites.
  entry: ['@babel/polyfill', './src/index.js'], // to enable async/await
  output: {
    path: __dirname + '/public/dist',
    filename: 'index.bundle.js',
  },
  plugins: [
    new WebpackPwaManifest({
      filename: 'manifest.webmanifest',
      publicPath: '/dist/', // important to remove /auto/ from icons
      name: 'Offline Budget Tracker',
      short_name: 'BudgetTracker',
      description: 'A tracker for your budget',
      background_color: '#ffffff',
      start_url: '/',
      display: 'standalone',
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve('public/icons/icon-192x192.png'),
          sizes: [192, 512], // multiple sizes
        },
      ],
    }),
  ],
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
