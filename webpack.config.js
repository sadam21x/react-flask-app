module.exports = {
    "mode": "production",
    "entry": "./src/index.js",
    "output": {
        "path": __dirname + '/public/static',
        "filename": "bundle.js"
    },
    "devtool": "source-map",
    "module": {
        "rules": [
            {
                "enforce": "pre",
                "test": /\.js$/,
                "exclude": /node_modules/,
                "loader": "eslint-loader",
                "options": {
                  "emitWarning": true,
                  "failOnError": false,
                  "failOnWarning": false
                }
            },
            {
                "test": /\.(js|jsx)$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader"
                }
            },
            {
                "test": /\.css$/,
                "use": [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                "test": /\.html$/,
                "use": [
                    {
                        "loader": "html-loader"
                    }
                ]
            }
        ]
    }
}