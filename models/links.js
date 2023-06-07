const { Schema, model, default: mongoose } = require("mongoose");

const subcategoySchema = new Schema({

  name: {
    type: String,
    required: [true, 'The name is required']
  },
  path: {
    type: String,
    required: [true, 'The path is required']
  },
}
)
const Subcategory = mongoose.model('Subcategory', subcategoySchema);

const LinkSchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required']
  },
  path: {
    type: String,
    required: [true, 'The path is required']
  },
  subcategories: {
    type: mongoose.ObjectId,
    ref: 'Subcategory'
  },
  state: {
    type: Boolean,
    default: true,
  },
})

module.exports = model('Link', LinkSchema)