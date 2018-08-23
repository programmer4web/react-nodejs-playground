/* global process __dirname */
const path = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	outputPath = path.join(__dirname, "dist"), /* eslint-disable-line no-unused-vars */
	port = process.env.PORT || 3000;

module.exports = {
	context: __dirname,
	entry: './src/App.jsx',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	resolve: {
		modules: ['node_modules', './src'],
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: 'css-loader!sass-loader'
				}),
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: 'css-loader'
				}),
			},
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader']
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("bundle.css"),
	],
	devServer: {
		port,
		historyApiFallback: true,
		publicPath: '/dist/',
	}
}
