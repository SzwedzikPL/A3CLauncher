const path = require('path');
const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");

const packageConfig = require('../package.json');

process.env.DIST_PATH = path.resolve(__dirname, '../dist');

// Ugly workaround for imporing axios adapter in electron-renderer
// https://github.com/webpack/webpack/issues/7953
const axiosPackagePath = '../node_modules/axios/package.json';
const fs = require('fs');
const axiosPackage = require(path.resolve(__dirname, axiosPackagePath));
delete axiosPackage.browser;
fs.writeFileSync(path.resolve(__dirname, axiosPackagePath), JSON.stringify(axiosPackage));

const rendererConfig = {
  devtool: process.env.NODE_ENV !== 'production' ? '#cheap-module-eval-source-map' : false,
  entry: {
    index: path.join(__dirname, '../src/renderer/index/index.js'),
    console: path.join(__dirname, '../src/renderer/console/index.js')
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            extractCSS: process.env.NODE_ENV === 'production',
            loaders: {
              sass: 'vue-style-loader!css-loader!sass-loader',
              scss: 'vue-style-loader!css-loader!sass-loader'
            }
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: false,
            name: 'images/[name].[contenthash].[ext]'
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: false,
          name: 'media/[name].[contenthash].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: false,
            name: 'fonts/[name].[contenthash].[ext]'
          }
        }
      }
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: path.resolve(__dirname, '../src/renderer/index/index.ejs'),
      nodeModules: process.env.NODE_ENV !== 'production'
        ? path.resolve(__dirname, '../node_modules')
        : false
    }),
    new HtmlWebpackPlugin({
      filename: 'console.html',
      chunks: ['console'],
      template: path.resolve(__dirname, '../src/renderer/console/index.ejs'),
    }),
    // Use preload for quicker init of assets (mainly fonts) in index.html
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'allAssets',
      excludeHtmlNames: ['console.html'],
      as(entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.(woff2?|eot|ttf|otf)$/.test(entry)) return 'font';
        if (/\.(png|jpe?g|gif|svg)$/.test(entry)) return 'image';
        return 'script';
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`,
      'process.env.PRODUCT_NAME': `"${packageConfig.build.productName}"`,
      'process.env.PRODUCT_VERSION': `"${packageConfig.version}"`,
      'process.env.PRODUCT_ID': `"${packageConfig.build.appId}"`,
    }),
  ],
  resolve: {
    plugins: [
      new DirectoryNamedWebpackPlugin({
        honorIndex: true,
        include: [
          path.resolve(__dirname, '../src'),
        ]
      })
    ],
    alias: {
      '@': path.resolve(__dirname, '../src/renderer/index'),
      '@console': path.resolve(__dirname, '../src/renderer/console'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json', '.css', '.node']
  },
  target: 'electron-renderer'
}

module.exports = rendererConfig;
