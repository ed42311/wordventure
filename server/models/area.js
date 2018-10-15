const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AreaSchema = new Schema( {
  title: String,
	firstArea: Boolean,
  body: String,
  createdAt: Date,
  modifiedAt: Date,
	areas: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Room',
		}
	],
} )

AreaSchema.pre('save', function(next) {
  const area = this;
  console.log("pre save plant")

  if (this.isNew) {
    area.createdAt = new Date();
  } else {
    area.modifiedAt = new Date();
  }
  return next();
});

module.exports = mongoose.model('Area', AreaSchema);
