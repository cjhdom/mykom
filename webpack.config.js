const webpack = require('webpack');

const devConf = {
    entry: [
        'whatwg-fetch',
        'babel-polyfill',
        'react-hot-loader/patch',
        './src/index.js'
    ],

    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },

    externals: [
        {
            "daum": "daum"
        }
    ],

    devServer: {
        inline: true,
        port: 7777,
        contentBase: __dirname + '/public/',
        hot: true,
        historyApiFallback: true,
    },

    devtool: 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|css|font|img)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};

const realConf = {
    entry: [
        'whatwg-fetch',
        'babel-polyfill',
        './src/index.js'
    ],

    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },

    externals: [
        {
            "daum": "daum"
        }
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|css|font|img)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};

module.exports = process.env.NODE_ENV === 'production' ? realConf : devConf;