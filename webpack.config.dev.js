const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/scripts/Index.ts',
    devtool: 'inline-source-map',
    target: "node",
    externals: [nodeExternals()],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, ''),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                url: false,
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'sass-loader',
                            query: {
                                sourceMap: true,
                            },
                        },
                    ],
                }),
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin({ filename: 'bundle.css' }),
        new ForkTsCheckerWebpackPlugin({
            eslint: true,
        }),
    ],
    watch: true,
    resolve: {
        extensions: ['.ts', '.js'],
    },
    watchOptions: {
        ignored: '/node_modules/'
    },
    mode: "development"
};
