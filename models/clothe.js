const { Schema, model } = require('mongoose');

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


const ClotheSchema = Schema({

  name: {
    type: String,
    required: [true, 'The name is required'],
    unique: true
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
  img: {
    type: String,
  },
  state: {
    type: Boolean,
    required: true,
    default: true,
  },
  category: {
    type: String,
    ref: 'Category',
    required: true
  },
  sizes: [SizeSchema]
})

ClotheSchema.methods.toJSON = function () {
  const { __v, ...clothe } = this.toObject();
  return clothe
}

module.exports = model('Clothe', ClotheSchema)