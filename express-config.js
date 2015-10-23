'use strict';

var express = require('express'),
	path = require('path');

/**
 * Express configuration
 */
module.exports = function(app) {
	var rootPath = path.normalize(__dirname + '/');

	app.configure('development', function(){

		// Disable caching of scripts for easier testing
		app.use(function noCache(req, res, next) {
			if (req.url.indexOf('/scripts/') === 0) {
				res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
				res.header('Pragma', 'no-cache');
				res.header('Expires', 0);
			}
			next();
		});

		app.use(express.static(path.join(rootPath, '.tmp')));
		app.use(express.static(path.join(rootPath)));
		app.set('views', rootPath);
	});

	app.configure('production', function(){
		app.use(express.favicon(path.join(rootPath, 'public', 'favicon.ico')));
		app.use(express.static(path.join(rootPath)));
		app.set('views', rootPath);
	});

	app.configure(function(){
		app.engine('html', require('ejs').renderFile);
		app.set('view engine', 'html');
		app.use(express.logger('dev'));
		app.use(express.json());
		app.use(express.urlencoded());
		app.use(express.methodOverride());
		app.use(express.cookieParser());
		
		// Router (only error handlers should come after this)
		app.use(app.router);
	});

	// Error handler
	app.configure('development', function(){
		app.use(express.errorHandler());
	});
};