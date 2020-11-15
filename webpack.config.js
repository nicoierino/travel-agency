const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const fse = require('fs-extra')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('postcss-hexrgba'),
  require('autoprefixer')
]

//Custom plugin
class runAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy images", function () {
      fse.copySync("./app/assets/images", "./docs/assets/images")
    })
  }
}

let config = {
  entry: './app/assets/scripts/App.js',
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./app/index.html"
    })],
  module: {
    rules: [

    ]
  }
}

if (currentTask == "dev") {
  config.module.rules = [{
    test: /\.css$/i,
    use: ['style-loader',
      'css-loader?url=false',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: postCSSPlugins
          }
        }
      }
    ]
  }]
  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app')
  }
  config.devServer = {
    before: function (app, server) {
      server._watch('./app/**/*.html')
    },
    contentBase: path.join(__dirname, 'app'),
    hot: true, //Inyectar cambios sin tener que refrescar el navegador
    port: 3000,
    host: '0.0.0.0'
  }
  config.mode = 'development'
}

if (currentTask == "build") {
  postCSSPlugins.push(require("cssnano"))
  config.module.rules = [{
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader,
      'css-loader?url=false',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: postCSSPlugins
        }
      }
    }
    ]
  },
  {
    test: /\.js$/i,
    exclude: /(node_modules)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"]
      }
    }
  }]
  config.output = {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].[contenthash:8].js'
  }
  config.mode = "production"
  config.optimization = {
    runtimeChunk: 'single',
    //https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  }
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash:8].css'
    }),
    new runAfterCompile()
  )
}

module.exports = config