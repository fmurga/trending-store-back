const { Schema, model } = require('mongoose');

const SizeSchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required']
  },
  perItem: {
    type: Number,
    default: 0,
  }
})


const DetailSchema = Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Clothe'
  },
  sizes: [SizeSchema],
})


const BuyerSchema = Schema({
  name: {
    type: String,
    required: [true, 'The Product Id is required']
  },
  email: {
    type: String,
    required: [true, 'The Size is required'],
  },
  phone: {
    type: Number,
  }
})


const OrderSchema = Schema({

  buyer: BuyerSchema,
  date: {
    type: Date,
    default: new Date()
  },
  detail: [DetailSchema],
  total: {
    type: Number,
  }
})

OrderSchema.methods.toJSON = function () {
  const { __v, ...order } = this.toObject();
  return order
}

module.exports = model('Order', OrderSchema)