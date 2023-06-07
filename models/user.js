const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required']
  },
  email: {
    type: String,
    required: [true, 'The email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'The password is required'],
  },
  role: {
    type: String,
    required: [true, 'The role is required'],
    enum: ['admin', 'user']
  },
  state: {
    type: Boolean,
    default: true,
  },
  googleSignedIn: {
    type: Boolean,
    default: false,
  }
})

UserSchema.methods.toJSON = function () {
  //remove version and password fields from schema
  const { __v, _id, password, ...user } = this.toObject();
  user.uid = _id;
  return user
}

module.exports = model('User', UserSchema)