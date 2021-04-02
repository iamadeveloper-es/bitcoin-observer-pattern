const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/ts/index',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test:/\.scss$/,
                use:['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
              { from: "./src/images", to: "./images" },
            ],
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
    ],
    resolve: {
        extensions: [
            ".ts"
        ]
    },
    output: {
        filename: 'js/index.js',
        path: path.resolve(__dirname, './build'),
    }
};
