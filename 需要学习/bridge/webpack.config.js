const webpack = require('webpack')
const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const TARGET = process.env.npm_lifecycle_event

const PATH = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist')
}

const common = {
	entry: PATH.src,
	output: {
		path: PATH.dist,
		filename: 'td.js'
	},
	eslint: {
		configFile: './.eslintrc.json'
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: 'eslint',
				include: PATH.src
			}
		],
		loaders: [
			{
				test: /\.js$/,
				include: PATH.src,
				loader: 'babel',
				query: {
					presets: ['es2015','stage-0']
				}
			}
		]
	}
	
}

if(TARGET === 'start') {
	module.exports = merge(common, {
		plugins: [
			new HtmlwebpackPlugin({
				title: 'Td-bridge Test Page.',
				inject: 'body',
				hash: true
			}),
			new webpack.HotModuleReplacementPlugin()
		],
		devServer: {
			hot: true,
			inline: true,
			stats: 'errors-only',
			contentBase: PATH.dist
		},
		devtool: 'source-map'
	})
}
if(TARGET === 'build') {
	module.exports = merge(common, {
		plugins: [
			// new webpack.optimize.UglifyJsPlugin({
			// 	compress: {
			// 		warnings: false
			// 	}
			// })
		]
	})
}

