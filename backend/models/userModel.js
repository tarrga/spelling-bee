const mongoose = require('mongoose');
const bycript = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bycript.genSalt(10);
  this.password = await bycript.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPass) {
  return await bycript.compare(enteredPass, this.password);
};

module.exports = mongoose.model('User', userSchema);
