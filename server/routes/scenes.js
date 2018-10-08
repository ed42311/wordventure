const Story = require( '../models/story' ).story
const Scene = require( '../models/story' ).scene
const Option = require( '../models/story' ).option

module.exports = function ( router ) {
	router
		.route( '/scenes' )
		//get a list of all scenes of all stories
		.get( function ( req, res ) {
			//find all scenes
			Scene.find( function ( err, scenes ) {
				if ( err ) 
					res.send( err )
					//show all scenes
				res.json( scenes )
			} )
		} )
	//route to the specific scene
	router
		.route( '/scenes/:scene_id' )
		//get specific scene
		.get( function ( req, res ) {
			Scene.findById( req.params.scene_id, function ( err, scene ) {
				if ( err ) 
					res.send( err )
					//show specific scene
				res.json( scene )
			} )
		} )
		//edit specific scene
		.put( function ( req, res ) {
			Scene.findById( req.params.scene_id, function ( err, scene ) {
				if ( err ) 
					res.send( err )
					//assign name to the scene
				scene.name = req.body.name
				//save scene information
				scene.save( function ( err ) {
					if ( err ) 
						res.send( err )
					res.json( { message: "scene updated" } )
				} )
			} )
		} )
	//route to the options scene
	router
		.route( '/scenes/:scene_id/options' )
		//get a list of all options within a scene
		.get( function ( req, res ) {
			Option.find( function ( err, options ) {
				if ( err ) 
					res.send( err )
					//show all options
				res.json( options )
			} )
		} )
		//add new option to the scene
		.post( function ( req, res ) {
			Scene.findById( {
				_id: req.params.scene_id
			}, function ( err, scene ) {
				const option = new Option();
				//assign scene reference to the option
				option.scene = scene;
				//assign name to the option
				option.name = req.body.name
				//add option to the options array in scene
				scene
					.options
					.push( option );
				//save edited scene
				scene.save( function ( err ) {
					if ( err ) 
						res.send( err );
					}
				)
				//save new option
				option.save( function ( err ) {
					res.json( { message: "option added" } );
				} )
			} )
		} )
	//route to the specific option
	router
		.route( '/scenes/:scene_id/options/:option_id' )
		//get specific option
		.get( function ( req, res ) {
			Option.findById( req.params.option_id, function ( err, option ) {
				if ( err ) 
					res.send( err )
					//show option info
				res.json( option )
			} )
		} )
		.delete( function ( req, res ) {
			//delete one option by id
			Option.deleteOne( {
				_id: req.params.option_id
			}, function ( err, option ) {
				if ( err ) 
					res.send( err );
				}
			);
			//delete option reference within scene
			Scene.findById( req.params.scene_id, function ( err, scene ) {
				if ( err ) 
					res.send( err )
				for ( var i = 0; i < scene.options.length; i++ ) {
					if ( scene.options[ i ] == req.params.option_id ) {
						scene
							.options
							.splice( i, 1 )
					}
				}
				//save updated scene
				scene.save( function ( err ) {
					res.json( { message: "option deleted" } );
				} )
			} )
		} )
		//edit option
		.put( function ( req, res ) {
			Option.findById( req.params.option_id, function ( err, option ) {
				if ( err ) 
					res.send( err )
					//assign new name to the option
				option.name = req.body.name;
				//save option
				option.save( function ( err ) {
					if ( err ) 
						res.send( err );
					res.json( { message: "option updated" } );
				} )
			} )
		} )
}
