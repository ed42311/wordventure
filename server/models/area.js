const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AreaSchema = new Schema( {
  title: String,
	isEntrance: Boolean,
  isExit: Boolean,
  body: String,
  createdAt: Date,
  modifiedAt: Date,
	actions: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Action',
		}
	],
} )

AreaSchema.pre('save', function(next) {
  const area = this;

  if (this.isNew) {
    area.createdAt = new Date();
  } else {
    area.modifiedAt = new Date();
  }
  return next();
});

module.exports = mongoose.model('Area', AreaSchema);
