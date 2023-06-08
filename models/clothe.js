const { Schema, model, default: mongoose } = require("mongoose");

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
    default: true,
  },
  category: {
    type: String,
    enum: ['women', 'men', 'unisex', 'children']
  },
  sizes: [SizeSchema]
})

ClotheSchema.methods.toJSON = function () {
  const { __v, ...clothe } = this.toObject();
  return clothe
}

module.exports = model('Clothe', ClotheSchema)