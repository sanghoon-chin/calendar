const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        word: "./src/word/index.ts",
        calendar: "./src/calendar/index.ts"
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
                    'style-loader'
                    , 'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/word/index.html',
            filename: 'word.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/calendar/index.html',
            filename: 'calendar.html'
        })
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