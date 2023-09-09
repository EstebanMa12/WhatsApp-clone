const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'makaiapp.js'
    },
    module: {
        rules: [
            // JavaScript
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: 'babel-loader',
            },
            // HTML
            {
              test: /\.html$/,
              use: 'html-loader',
            },
            // Images
            {
              test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
              type: 'asset/resource',
            },
            // Fonts and SVGs
            {
              test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
              type: 'asset/inline',
            },
            {
              test: /\.(css)$/,
              use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.(woff(2)?|eot|ttf|otf|svg|png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
          ],
    },
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        // contentBase: path.join(__dirname, './dist'),
        open: true,
        compress: true,
        // hot: true,
        // liveReload: true,
        port: 5500,
    }, 
    plugins: [
        new HtmlWebPackPlugin({
            template: 'index.html',
            filename: 'index.html',
            favicon: 'public/ico.png'
        }),
        new CleanWebpackPlugin()
    ]
}