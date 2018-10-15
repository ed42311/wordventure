const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  trigger: {
    type: String,
    index: {unique: true}
  },
  area: {
    type: Schema.Types.ObjectId,
    ref: 'Area'
  },
  isMovement: Boolean,
  response: String,
  createdAt: Date,
  modifiedAt: Date
})

ActionSchema.pre('save', function(next) {
  const action = this;

  if (this.isNew) {
    action.createdAt = new Date();
  } else {
    action.modifiedAt = new Date();
  }
  return next();
});

module.exports = mongoose.model('Action', ActionSchema);
