"use strict";

// initiate variables
var fs              = require("fs");
var path 			= require( 'path' );
//var WebSocketServer = require( path.join( __dirname, '/node_modules/ws/' ) ).Server;
var Twitter 		= require( path.join( __dirname, '/node_modules/twitter-node-client/' ) ).Twitter;
var http            = require('http');
var	url 			= require("url");
var port 			= process.env.PORT || 3000;

// are we debugging or live?
var debug = true;
var twitterDataRefresh = 900000;

/**
 *
 * Check if client is still connected
 * 
**/
function heartbeat() 
{
	this.isAlive = true;

	console.log( 'Tick Tock!', new Date().toUTCString() );
}

/**
 *
 * Log File
 * 
**/
var log = function(entry) {
    fs.appendFileSync('/tmp/tugofwar-app.log', new Date().toISOString() + ' - ' + entry + '\n');
};

// are we debugging or live?
var debug           = true;
var checkMimeType   = true;
var hostAddress     = '127.0.0.1';

/**
 *
 * Innitiate Webserver 
 *
 * @param {Array.elements}
 * @param {String.myClass}
 *
 * @return {Null} []
 * 
**/
var HttpServer = http.createServer();

HttpServer.listen( port, hostAddress, function(err) 
    {
        if( err ) {
            return console.log('Http Server Broke: ', err);
        } else {
            console.log('..::Http Server is listening on ' + port + '::..', new Date().toUTCString() );
        }
    }
);
HttpServer.on( 'request', (request, response) => {

	var parsedUrl = url.parse(request.url, true); // true to get query as object
    
	console.log('Received request from ' + request.url );
	
	//response.end('Hello World! Node.js is working correctly.\n');

	switch( parsedUrl.pathname ) {

		case '/api/':

			console.info( 'API CALL:', parsedUrl.query.woeidb );

			//_requestPlaceTrends( response, '/trends/place.json', { id: parsedUrl.query.woeidb } );

			break;

		case '/':
		case '/index.html.var':

			getFile( 'index.html', response, 'text/html' );

			break;

		default:

			console.info('Lord Knows whachu doing.', parsedUrl.pathname );

			break;

	}

});


function getFile( localPath, res, mimeType ) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			if (mimeType != undefined) {
				res.setHeader("Content-Type", mimeType);
			}
			res.statusCode = 200;
			res.end(contents);

			//startWebCamParty();

		} else {
			res.writeHead(500);
			res.end();
		}
	});
}
