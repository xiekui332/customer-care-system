const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    devtool:false,
    // resolve: {
    //     extensions: ['.js', '.jsx', '.css', '.scss', '.json'],
    //     alias: {
    //         //配置后可以直接用@来表示这个位置,直接应用目录下得文件,是绝对路径
    //         '@': path.join(__dirname, './src')
    //     }
    // },

    // module: {
    //     rules: [
    //         {
    //             //自動編譯 JSX 或 JS 檔 （require 可載入 JSX 了）
    //             test: /\.(js|jsx)$/,
    //             use: { loader: 'babel-loader' },
    //             exclude: /node_modules/
    //         }
    //     ]
    // },


    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                loader: 'babel-loader',
                query: {
                    presets:['es2015','react','stage-0']
                }
            },
            {
                test:/\.css$/,
                loaders:['style','css']
            },
            {
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query:{
                    limit: 10000,
                    name:'./build/img/[name].[hash:7].[ext]'
                }
            },
            {
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?&/,
                loader:'url',
                query: {
                    limit:10000,
                    name:'./build/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
}