import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import Dotenv from 'dotenv-webpack';

const isProduction = process.env['NODE_ENV'] == 'production';

const stylesHandler = MiniCssExtractPlugin.loader;

const config: webpack.Configuration & { devServer?: DevServerConfiguration } = {
	mode: isProduction ? 'production' : 'development',
	devtool: isProduction ? false : 'source-map',
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
		}),

		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].[contenthash].css',
		}),

		new Dotenv({
			path: './.env',
			safe: false,
		}),

		// Add your plugins here
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: 'ts-loader',
				exclude: ['/node_modules/'],
			},
			{
				test: /\.css$/i,
				use: [stylesHandler, 'css-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [stylesHandler, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},

			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
	},
};

if (!isProduction) {
	config.devServer = {
		open: true,
		host: 'localhost',
	};
}

export default config;
