const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: { main: './src/js/app.js' },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['env']
        }
      },
      {
        test: /\.scss$/,
        use:  ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: 'img/'
          }
        }
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin('dist/img', {}),
    // new CleanWebpackPlugin('dist/app.js', {}),
    // new CleanWebpackPlugin('dist/index.html', {}),
    // new CleanWebpackPlugin('dist/main.css', {}),
    new CleanWebpackPlugin('docs', {}),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
};
