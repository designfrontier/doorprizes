var monument = require('monument');

require('./data/attendees');

monument.server({
				routePath: './routes'
				, templatePath: './templates'
				, publicPath: './public'
				, port: process.env.PORT || 3000
			});