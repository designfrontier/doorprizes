var monument = require('monument')
	, compress = false;

if(typeof process.env.node_env !== 'undefined' && process.env.node_env === 'production'){
	compress = true;
}

require('./data/attendees');

monument.server({
				routePath: './routes'
				, templatePath: './templates'
				, publicPath: './public'
				, port: process.env.PORT || 3000
				, compress: compress
			});