const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Knights Travails',
            template: './src/index-template.html'
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            /*
            For leader-line library, from the author
            https://github.com/anseki/leader-line/issues/8
            https://www.npmjs.com/package/skeleton-loader

            Alternative is to manually put the following line at the bottom of the leader-line.min.js file:
            export default LeaderLine
            */
            {
                test: path.resolve(__dirname, 'node_modules/leader-line/'),
                use: [{
                  loader: 'skeleton-loader',
                  options: {procedure: content => `${content}export default LeaderLine`}
                }]
            },
        ],
    },
    optimization: {
        runtimeChunk: 'single',
    },
};