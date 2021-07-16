const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        word: "./src/word/index.ts",
        calendar: "./src/calendar/index.ts",
        study: "./src/study/index.ts"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: ['/node_modules']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/word/index.html',
            filename: 'word.html',
            chunks: ['word']
        }),
        new HtmlWebpackPlugin({
            template: './src/calendar/index.html',
            filename: 'calendar.html',
            chunks: ['calendar']
        }),
        new HtmlWebpackPlugin({
            template: './src/study/index.html',
            filename: 'study.html',
            chunks: ['study']
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/assets", to: "assets" },
            ],
          }),
    ],
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 5500
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}