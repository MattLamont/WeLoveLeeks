var express = require('express');
var path = require('path');
var fs = require('fs');
var request = require( 'request' );

var app = express();

var app_key = '5606e20badfd6352c1bc3f69ee283b23';
var app_id  = '2d6c2a99';

app.use( '/css' , express.static( __dirname + '/css' ));
app.use( '/images' , express.static( __dirname + '/images' ));
app.use( '/js' , express.static( __dirname + '/js' ));
app.use( '/fonts' , express.static( __dirname + '/fonts' ));

app.get( '/recipes' , function( req , res ){

	var request_url = 'https://api.edamam.com/search' + 
					  '?q=' +
					  req.query.q +
	                  '&app_id=' +
	                  app_id +
	                  '&app_key=' +
              		  app_key +
              		  '&from=' +
              		  req.query.from +
              		  '&to=' +
              		  req.query.to;

	request( {
		url: request_url ,
		method: 'GET',
		json: true 
		} , function( error , response , body ){

		if( error ){
			console.log( error );
			res.json( error );
		}

		res.json( body );
	})

});

app.get( '/' , function( req , res ){

	res.sendFile( 'index.html' , {root: path.join( __dirname , './html')});
	console.log( "request for index.html" );

});

app.get( /^(.+)$/ , function( req , res ){

	console.log( req.params );
	res.sendFile( req.params[0] + '.html' , {root: path.join( __dirname , './html')});

});


var ip = process.env.IP || 'localhost';
var port = process.env.PORT || 10010;
app.listen( port , ip );