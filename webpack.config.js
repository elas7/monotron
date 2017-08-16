var path = require('path');
var webpack = require("webpack");

const env = process.env.NODE_ENV || 'development';

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
    })
];

// add Uglify plugin in production
if (env === 'production') {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin()
    );
}

// Configuration data
module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundles/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, "src")],
                loader: 'babel-loader'
            }
        ]
    },
    plugins: plugins
};