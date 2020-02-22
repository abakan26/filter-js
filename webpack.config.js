const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const argv = require('yargs').argv;
const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackCleanPlugin = require("webpack-clean-plugin");



module.exports = {
    
    devServer: {
        contentBase: "./dist",
        port: 3000,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    entry: {
        main: "./src/main.js",
        scroll: "./src/scroll_top.js",
    },

    output: {
        filename: '[name].js',
        path: path.join(__dirname, "./dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,

                    "css-loader",

                    "postcss-loader",

                    "group-css-media-queries-loader",
                    
                    "resolve-url-loader",
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }

                ],
            },
            {
                test: /\.(png|gif|jpe?g)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: 'images/[name].[ext]',
                        },
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                        },
                    }
                ]
            }



        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            chunks: ['main', 'scroll']
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new WebpackCleanPlugin({
            on: "emit",
            path: 'dist'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],

};