'use strict'

const webpack = require('webpack')

const PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  context: __dirname,
  devServer: {
    contentBase: `${__dirname}/public`,
    historyApiFallback: true,
  },
  entry: {
    app: './samples/app.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: [
              'transform-class-properties',
              'transform-export-extensions',
              'transform-object-rest-spread',
            ],
            presets: [
              'react',
              PRODUCTION ? 'babili' : false,
            ].filter(Boolean)
          },
        }],
      },
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].bundle.js',
  },
  resolve: {
    alias: {
      // react: 'preact-compat',
      // 'react-dom': 'preact-compat',
      'react-native': './react-native-web.js'
    }
  },
}
