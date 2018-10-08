// importing dependencies
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const path = require( 'path' );
const Scene = require( './models/story' ).story;
const Option = require( './models/story' ).story;

mongoose.connect( 'mongodb://localhost:27017/story', { useNewUrlParser: true } );

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static( path.join( __dirname, 'public' ) ) )
app.use( bodyParser.json() );

const port = process.env.PORT || 8080;

//Routes for api
//=====================================
const router = express.Router();
// middleware starts here

// function fired with every API call
router.use( function ( req, res, next ) {
	console.log( "something is happening" );
	next();
} )

// test route to make sure everything is working
router.get( '/', function ( req, res ) {
	res.json( { message: "welcome to the best api" } )
} )

//routes for API
//story route
const storyRoutes = require( './routes/stories.js' )
storyRoutes( router )
const sceneRoutes = require( './routes/scenes.js' )
sceneRoutes( router )
//end of middleware
app.use( '/api', router )
//listen to port
app.listen( port )
//print out wht port you are on
console.log( 'Magic happens on port' + port )
