const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackCommonConfig = require('./webpack.config.common');

module.exports = merge(webpackCommonConfig, {
	plugins: [
		new UglifyJsPlugin({
			sourceMap: true
		}),
		new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
	],
	devtool: "source-map",
	devServer: {
		compress: true,
	},
	mode: 'production'
});
