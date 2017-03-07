const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const {config: APPCONFIG} = require('./package');

const bundlename = APPCONFIG.brandname.toLowerCase();

const config = {
    context: path.resolve(__dirname, './'),
    entry: {
        app: './src/index.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `${bundlename}.js`
    },
    resolve: {
        // Resolve *.jsx files
        extensions: ['.js', '.json', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            }, {
                test: /\.(css|less)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        'postcss-loader',
                        'less-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        // extract CSS into separate file
        new ExtractTextPlugin(`${bundlename}.css`),
        // Generate index.html entry point
        new HtmlWebpackPlugin({title: `${APPCONFIG.brandname}`, template: './src/index.html'}),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer]
            }
        })
    ],
    devServer: {
        // Development server config
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        historyApiFallback: true,
        compress: true
    },
    devtool: 'eval-source-map' // Default development sourcemap
};

// change the sourcemap type in production mode
if (process.env.NODE_ENV === 'production') {
    config.devtool = 'source-map';
}

module.exports = config;
