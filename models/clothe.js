const { Schema, model, default: mongoose } = require("mongoose");
const Size = require("../models/sizes");

const ClotheSchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required']
  },
  price: {
    type: Number,
    required: [true, 'The price is required'],
  },
  stock: {
    type: Number,
    required: [true, 'The stock is required'],
  },
  description: {
    type: String,
    required: false,
  },
  initial: {
    type: Number,
  },
  pictureUrl: {
    type: String,
  },
  state: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    enum: ['women', 'men', 'unisex', 'children']
  },
  sizes: [{
    type: mongoose.ObjectId,
    ref: 'Size'
  }]
})

module.exports = model('Clothe', ClotheSchema)