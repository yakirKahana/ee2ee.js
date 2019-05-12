const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/ee2ee.js',
    output: {
        filename: 'ee2ee.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};