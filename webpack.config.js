const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const fs = require('fs');
const Dotenv = require('dotenv-webpack');

const publicPath = '/';
// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    entry: "./src/index.js",
    output: {
        // The build folder.
        publicPath: publicPath,
        path: resolveApp('dist'),
        filename: "bundle.js",
    },
    devServer: {
        contentBase: './src/index.js',
        compress: true,
        port: 3001, // port number
        historyApiFallback: true,
        quiet: true
    },
    resolve: {
        alias: {
            Assets: path.resolve(__dirname, 'src/assets/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "index.html",
            favicon: "./public/favicon.ico"
        }),
        new Dotenv({
            path: process.env.NODE_ENV === 'production' ? './.env.prod' : './.env.dev'
        })
    ]
};


