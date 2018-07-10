const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = {
	entry: './src/index.ts',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'docs')
	},
	plugins: [
		new HtmlWebpackPlugin({ template: './src/index.html' })
	]
}

process.env.NODE_ENV === 'production' ?
	config.plugins.push(
		new UglifyJsPlugin({
			sourceMap: true,
			extractComments: true,
			uglifyOptions: {
				compress: true,
			}
		})
	)
	: null

module.exports = config
