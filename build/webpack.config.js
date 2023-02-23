const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        // use: {
        //   loader: 'url-loader',
          
        // },
        use: {
          loader: 'url-loader',
          options: {
            limit: 10*1024, // 将10kb以下的图片转成base64
            outputPath: 'assets'

          }  
        },
        
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: './'
  },
  plugins: [
    new HtmlWebpackPlugin({
        // filename: 'index.html',
        // template: 'index.html',
    }),
    new CopyPlugin({
        patterns: [
           "manifest.json",
           { from: 'src/img', to: 'img'}
        ]
    })
  ]
};