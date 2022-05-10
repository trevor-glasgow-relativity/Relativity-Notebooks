const path = require('path');
  
module.exports = {
    entry: [
        "core-js/stable",
        "regenerator-runtime/runtime",
        "whatwg-fetch",
        path.resolve(__dirname, "src/scripts/main.js"),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
	mode: "production",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ],
    },
};