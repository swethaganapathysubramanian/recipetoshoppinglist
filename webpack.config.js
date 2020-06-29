const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'containers'),
        filename: 'js/bundle.js'
    },
    devtool: 'eval-source-map',  
    devServer:{
        contentBase: './containers'  
    },
    plugins: [
        new HtmlWebpackPlugin({
            fileName: 'index.html',
            template: './src/index.html'
        })
    ],
    module:{
        rules:[
            {
            test: /\.js$/,
            exclude: /node_modules/,
            use:{
                loader: 'babel-loader',
            }
        }  
        ]
    },
    node: {
        fs: 'empty'
    }
    
};