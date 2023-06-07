const { Schema, model } = require("mongoose");

const SizeSchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required']
  },
  inStock: {
    type: Boolean,
    default: false,
  },
  stock: {
    type: Number,
    default: 0,
  }
})

module.exports = model('Size', SizeSchema)