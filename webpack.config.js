const path = require("path"),
	webpack = require("webpack"),
	nodeExternals = require("webpack-node-externals"),
	MiniCssExtractPlugin = require("mini-css-extract-plugin");

const browserConfig = {
	mode: "development",
	entry: path.resolve(__dirname, "src", "browser", "index.js"),
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "bundle.js",
		publicPath: "/",
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: "babel-loader" },
			{
				test: /\.(css|sass|scss)$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			__isBrowser__: "true",
		}),
		new MiniCssExtractPlugin({
			filename: "styles.css",
		}),
	],
};

const serverConfig = {
	mode: "development",
	entry: path.resolve(__dirname, "src", "server", "index.js"),
	target: "node",
	externals: [nodeExternals()],
	output: {
		path: __dirname,
		filename: "server.js",
		publicPath: "/",
	},
	module: {
		rules: [{ test: /\.(js)$/, use: "babel-loader" }],
	},
	plugins: [
		new webpack.DefinePlugin({
			__isBrowser__: "false",
		}),
	],
};

module.exports = [browserConfig, serverConfig];
