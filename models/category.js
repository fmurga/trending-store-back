const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
  },

})

module.exports = model('Category', CategorySchema)