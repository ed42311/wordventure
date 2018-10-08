const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const StorySchema = new Schema( {
	name: String,
	scenes: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Scene',
		}
	],
} )

const SceneSchema = new Schema( {
	name: String,
	story: {
		type: Schema.Types.ObjectId,
		ref: 'Story',
	},
	options: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Option'
		}
	]
} )

const OptionSchema = new Schema( {
	name: String,
	scene: {
		type: Schema.Types.ObjectId,
		ref: 'Scene'
	},
} )

module.exports = {
	story: mongoose.model( 'Story', StorySchema ),
	scene: mongoose.model( 'Scene', SceneSchema ),
	option: mongoose.model( 'Option', OptionSchema )
}
