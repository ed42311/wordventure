const Story = require( '../models/story' ).story
const Scene = require( '../models/story' ).scene

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
}
