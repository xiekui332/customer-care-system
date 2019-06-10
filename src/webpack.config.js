// var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// module.exports = {
//     entry: path.resolve(__dirname, 'index.js'),
//     output:{
//         path: path.resolve(__dirname, 'build'),
//         filename: 'bundle.js'
//     },
//     resolve: {
// 		extensions: ['.js', '.jsx', '.less', 'css']
// 	},

//     module:{
//         loaders:[
//             {
//                 test:/\.less$/,
//                 loaders:['style-loader', 'css-loader', 'less-loader']
//             },
//             {
//                 test:/\.js?$/,
//                 loaders: ['babel-loader']
//             } 
//         ]
//     },

//     plugins:[
//         new HtmlWebpackPlugin({
//             title:'大竹农商银行客户关系系统'
//         })
//     ]
// }