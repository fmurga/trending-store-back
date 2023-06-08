const { Schema, model } = require("mongoose");

const subcategoySchema = new Schema({
  name: {
    type: String,
  },
  path: {
    type: String,
  },
});

const LinkSchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required']
  },
  path: {
    type: String,
    required: [true, 'The path is required']
  },
  subcategories: [subcategoySchema],
  state: {
    type: Boolean,
    default: true,
  },
})

LinkSchema.methods.toJSON = function () {
  const { __v, ...link } = this.toObject();
  return link
}

module.exports = model('Link', LinkSchema)