const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {


  entry: {
    game: './js/game.ts',

  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/game'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],

  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin([
      {from: 'index.html', to: 'index.html'},
    ]),

    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
  ]
};
