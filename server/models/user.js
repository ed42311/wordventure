const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  createdAt: Date,
  modifiedAt: Date,
  email: {
    type: String,
    index: {unique: true}
  },
  name: String,
  password: String
})

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
userSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  if (user.isNew) {
    user.createdAt = new Date();
  } else {
    user.modifiedAt = new Date();
  }

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      user.password = hash;

      return next();
    });
  });
});

module.exports = mongoose.model('User', userSchema);
