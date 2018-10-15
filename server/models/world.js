const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorldSchema = new Schema( {
  title: String,
  body: String,
  createdAt: Date,
  modifiedAt: Date,
	areas: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Area',
		}
	],
} )

WorldSchema.pre('save', function(next) {
  const world = this;

  if (this.isNew) {
    world.createdAt = new Date();
  } else {
    world.modifiedAt = new Date();
  }

  return next();
});

module.exports = mongoose.model('World', WorldSchema);
