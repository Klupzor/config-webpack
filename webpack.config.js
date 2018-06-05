const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",  //development|production

    entry: {
        home: "./src/index"
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
    },

    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },

    module: {
        rules: [
            {
                // test: que tipo de archivo quiero reconocer,
                // use: que loader se va a encargar del archivo
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['env','react']
                  }
                },
            },
            // {
            //     test: /\.css$/,
            //     // use: ['style-loader','css-loader']
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         'css-loader'
            //     ]
            // },
            // {
            //     test: /\.scss$/,
            //     use: [
            //         // fallback to style-loader in development
            //         process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
            //         "css-loader",
            //         "sass-loader" // compiles Sass to CSS
            //     ]
            // }
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                  
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: {
                  loader: 'url-loader',
                  options: {
                    limit: 1000000,
                    fallback: 'file-loader',
                    name: 'images/[name].[hash].[ext]',
                  }
                }
              } 
        ]
    },

    plugins : [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            title: 'Glumsus',
            template: './src/html/index.html',
            chunks: ['home']
        }),
        new CleanWebpackPlugin(['dist']),
        // new CopyWebpackPlugin([
        //     { from: 'images/covers/', to: 'covers/', force: true }
        // ])
    ]

}
