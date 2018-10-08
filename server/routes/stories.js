const Story = require( '../models/story' ).story;
const Scene = require( '../models/story' ).scene;
module.exports = function ( router ) {

	router
		.route( '/stories' )
		//create a Story
		.post( function ( req, res ) {
			const story = new Story();
			story.name = req.body.name;

			//save Story
			story.save( function ( err ) {
				if ( err ) 
					res.send( err );
				res.json( { message: "story created" } );
			} )

		} )
		.get( function ( req, res ) {
			Story.find( function ( err, stories ) {
				if ( err ) 
					res.send( err )
				res.json( stories )
			} )
		} )
	router
		.route( '/stories/:story_id' )
		.get( function ( req, res ) {
			Story.findById( req.params.story_id, function ( err, story ) {
				if ( err ) 
					res.send( err )
				res.json( story )
			} )
		} )
		.put( function ( req, res ) {
			Story.findById( req.params.story_id, function ( err, story ) {
				if ( err ) 
					res.send( err )
				story.name = req.body.name;
				//save Story
				story.save( function ( err ) {
					if ( err ) 
						res.send( err );
					res.json( { message: "story updated" } );
				} )
			} )
		} )
		.delete( function ( req, res ) {
			Story.remove( {
				_id: req.params.story_id
			}, function ( err, story ) {
				if ( err ) 
					res.send( err )
				res.json( { message: "Story deleted" } )
			}, )
		} )

	// see scenes of a specific story
	router
		.route( '/stories/:story_id/scenes' )
		// add story scene to a specific story
		.post( function ( req, res ) {
			Story.findById( {
				_id: req.params.story_id
			}, function ( err, story ) {
				const scene = new Scene();
				scene.story = story;
				scene.name = req
					.body
					.name
					story
					.scenes
					.push( scene );
				story.save( function ( err ) {
					if ( err ) 
						res.send( err );
					}
				)
				scene.save( function ( err ) {
					res.json( { message: "scene added" } );
				} )
			} )
		} )
		//see a list of scenes to the specific story
		.get( function ( req, res ) {
			Story
				.findById( req.params.story_id, function ( err, story ) {
					if ( err ) 
						res.send( err )
						// res.json(story.scenes)
					
					//get more information about scenes in the story
				} )
				.populate( 'scenes', 'name' )
				.exec( function ( err, story ) {
					res.json( story.scenes )
				} )
		} )
	router
		.route( '/stories/:story_id/scenes/:scene_id' )
		.get( function ( req, res ) {
			Scene.findById( req.params.scene_id, function ( err, scene ) {
				if ( err ) 
					res.send( err )
				res.json( scene )
			} )
		} )
		.delete( function ( req, res ) {
			//delete one scene by id
			Scene.deleteOne( {
				_id: req.params.scene_id
			}, function ( err, scene ) {
				if ( err ) 
					res.send( err );
				}
			);
			Story.findById( req.params.story_id, function ( err, story ) {
				if ( err ) 
					res.send( err )
				for ( var i = 0; i < story.scenes.length; i++ ) {
					if ( story.scenes[ i ] == req.params.scene_id ) {
						story
							.scenes
							.splice( i, 1 )
					}
				}
				story.save( function ( err ) {
					res.json( { message: "scene deleted" } );
				} )
			} )
		} )
		.put( function ( req, res ) {
			Scene.findById( req.params.scene_id, function ( err, scene ) {
				if ( err ) 
					res.send( err )
				scene.name = req.body.name;
				//save Story
				scene.save( function ( err ) {
					if ( err ) 
						res.send( err );
					res.json( { message: "scene updated" } );
				} )
			} )
		} )

}
