const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        bundle: path.join(__dirname, './src/index'),
        vendor: ['react', 'react-dom', 'react-router', 'react-router-dom', 'react-redux']
    },
    output: {
        filename: 'index.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [ //配置加载器
            {
                test: /\.js$/, //配置要处理的文件格式，一般使用正则表达式匹配
                loader: 'babel-loader', //使用的加载器名称
                query: { //babel的配置参数，可以写在.babelrc文件里也可以写在这里
                    presets: ["@babel/env", "@babel/react"],
                    "plugins": [
                        "dynamic-import-webpack",
                        "@babel/plugin-proposal-class-properties"
                    ]
                }
            },
            {
                test: /\.css$/,
                // loader: ExtractTextPlugin.extract('style-loader!css-loader'), //使用的加载器名称
                // loader: 'style-loader!css-loader'
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {   
                test:[/\.eot$/,/\.svg$/,/\.ttf$/,/\.woff$/,/\.woff2$/],
                loader:['file-loader']
            },
            {
                test: [/\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                loader: 'url-loader',
                options: {
                  limit: 10000, //1w字节以下大小的图片会自动转成base64
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', //指定模板路径
            filename: 'index.html', //指定文件名
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
        
    ],
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    },
                    compress: {
                        drop_console: true
                    }
                }
            }),
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
}