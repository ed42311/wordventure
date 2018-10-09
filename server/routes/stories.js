//importing story and scene models
const Story = require( '../models/story' ).story;
const Scene = require( '../models/story' ).scene;
const Option = require( '../models/story' ).option
module.exports = function ( router ) {
	//route to stories
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
		//get all stories
		.get( function ( req, res ) {
			Story.find( function ( err, stories ) {
				if ( err ) 
					res.send( err )
				res.json( stories )
			} )
		} )
	//route to specific stories
	router
		.route( '/stories/:story_id' )
		//get specific story
		.get( function ( req, res ) {
			Story.findById( req.params.story_id, function ( err, story ) {
				if ( err ) 
					res.send( err )
				res.json( story )
			} )
		} )
		//edit specific story
		.put( function ( req, res ) {
			Story.findById( req.params.story_id, function ( err, story ) {
				if ( err ) 
					res.send( err )
				story.name = req.body.name;
				//save edited story
				story.save( function ( err ) {
					if ( err ) 
						res.send( err );
					res.json( { message: "story updated" } );
				} )
			} )
		} )
		//delete specific story
		//delete specific story
		.delete( function ( req, res ) {
			Story
				.findById( { _id: req.params.story_id } )
				.then( ( story ) => {
					new Promise( ( resolveScenes, rejectScenes ) => {
						if ( story.scenes.length ) {
							console.log( "something inside", story.scene )
							let sceneCounter = 0;
							story
								.scenes
								.forEach( scene_id => {
									Scene
										.findById( scene_id )
										.then( ( scene ) => {
											if ( scene.options.length ) {
												Option
													.deleteMany( { 'scene': scene._id } )
													.then( () => {
														scene.remove();
														sceneCounter++;
														if ( sceneCounter === story.scenes.length ) 
															resolveScenes();
														}
													)
											} else {
												scene.remove();
												sceneCounter++;
												if ( sceneCounter === story.scenes.length ) 
													resolveScenes();
												}
											} )
								} )
						} else {
							console.log( 'empty model' )
							resolveScenes();
						}
					} ).then( () => {
						console.log( "here" )
						story.remove( function ( err ) {
							res.json( { message: "story and all scenes and option within it deleted" } )
						} )
					} )
				} )
				.catch( err => res.send( err ) )
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
				//assiging story reference to scene
				scene.story = story;
				//assigning scene name
				scene.name = req.body.name
				//adding scene to scenes within story
				story
					.scenes
					.push( scene );
				//saving changes to story
				story.save( function ( err ) {
					if ( err ) 
						res.send( err );
					}
				)
				//saving scene
				scene.save( function ( err ) {
					res.json( { message: "scene added" } );
				} )
			} )
		} )
		//see a list of scenes for the specific story
		.get( function ( req, res ) {
			Story
				.findById( req.params.story_id, function ( err, story ) {
					if ( err ) 
						res.send( err )
				} )
				//see scene name in the story
				.populate( 'scenes', 'name' )
				.exec( function ( err, story ) {
					res.json( story.scenes )
				} )
		} )
	//routes to specific scene within specific story
	router
		.route( '/stories/:story_id/scenes/:scene_id' )
		//get specific scene
		.get( function ( req, res ) {
			Scene.findById( req.params.scene_id, function ( err, scene ) {
				if ( err ) 
					res.send( err )
				res.json( scene )
			} )
		} )
		//delete specific scene
		.delete( function ( req, res ) {
			Scene
				.findById( { _id: req.params.scene_id } )
				.then( ( scene ) => {
					console.log( scene )
					new Promise( ( resolveScenes, rejectScenes ) => {

						if ( scene.options.length ) {
							console.log( "something inside", scene.options )
							Option
								.deleteMany( { 'scene': scene._id } )
								.then( () => {
									resolveScenes();
								} )
						} else {
							resolveScenes();
						}
					} ).then( () => {
						console.log( "here" )
						scene.remove()
						Story
							.findById( req.params.story_id )
							.then( ( story ) => {
								for ( var i = 0; i < story.scenes.length; i++ ) {
									if ( story.scenes[ i ] == req.params.scene_id ) {
										story
											.scenes
											.splice( i, 1 )
									}
								}
								//save updated scene
								story.save( function () {
									res.json( { message: "option deleted" } );
								} )
							} )
					} )
				} )
				.catch( err => res.send( err ) )
			} )
		//edit specific scene within story
		.put( function ( req, res ) {
			Scene.findById( req.params.scene_id, function ( err, scene ) {
				if ( err ) 
					res.send( err )
				scene.name = req.body.name;
				//save scene with changes
				scene.save( function ( err ) {
					if ( err ) 
						res.send( err );
					res.json( { message: "scene updated" } );
				} )
			} )
		} )
}
