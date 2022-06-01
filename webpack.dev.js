const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    devServer: {
        port: 8714,
    },

    // Reference: From "Evaluate News Article with NLP" course
    // Lesson 4-4: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0430/modules/c73f80be-8f45-406d-a709-8123a69e6d52/lessons/722ecfe4-3174-4a6e-8638-ea0ab8eb49ac/concepts/abea4754-add0-465b-be4e-5f710a5a758f
    output: {
        libraryTarget:'var',
        library: "Client",
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
}