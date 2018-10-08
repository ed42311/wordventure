const Story = require( '../models/story' ).story
const Scene = require( '../models/story' ).scene
const Option = require( '../models/story' ).option

module.exports = function ( router ) {
	router
		.route( '/scenes' )
		//get a list of all scenes of all storys
		.get( function ( req, res ) {
			Scene.find( function ( err, scenes ) {
				if ( err ) 
					res.send( err )
				res.json( scenes )
			} )
		} )
	//route to the specific scene
	router
		.route( '/scenes/:scene_id' )
		//edit specific scene
		.get( function ( req, res ) {
			Scene.findById( req.params.scene_id, function ( err, scene ) {
				if ( err ) 
					res.send( err )
				res.json( scene )
			} )
		} )
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

	router
		.route( '/scenes/:scene_id/options' )
		//get a list of all scenes of all storys
		.get( function ( req, res ) {
			Option.find( function ( err, options ) {
				if ( err ) 
					res.send( err )
				res.json( options )
			} )
		} )
		.post( function ( req, res ) {
			Scene.findById( {
				_id: req.params.scene_id
			}, function ( err, scene ) {
				const option = new Option();
				option.scene = scene;
				option.name = req
					.body
					.name
					scene
					.options
					.push( option );
				scene.save( function ( err ) {
					if ( err ) 
						res.send( err );
					}
				)
				option.save( function ( err ) {
					res.json( { message: "option added" } );
				} )
			} )
		} )
	router
		.route( '/scenes/:scene_id/options/:option_id' )
		.get( function ( req, res ) {
			Option.findById( req.params.option_id, function ( err, option ) {
				if ( err ) 
					res.send( err )
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
				scene.save( function ( err ) {
					res.json( { message: "option deleted" } );
				} )
			} )
		} )
		.put( function ( req, res ) {
			Option.findById( req.params.option_id, function ( err, option ) {
				if ( err ) 
					res.send( err )
				option.name = req.body.name;
				//save Story
				option.save( function ( err ) {
					if ( err ) 
						res.send( err );
					res.json( { message: "option updated" } );
				} )
			} )
		} )
}
