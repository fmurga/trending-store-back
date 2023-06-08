
const Category = require('../models/category');
const Clothe = require('../models/clothe');

const validateCategory = async (category = '') => {
  const existsCategory = await Category.findOne({ name: category });
  console.log(existsCategory)
  if (!existsCategory) {
    throw new Error(`Category ${category} does not exist`);
  }
}

const existsCloheById = async (id) => {
  const existClothe = await Clothe.findById(id)
  if (!existClothe) {
    throw new Error(`The Id ${id} does not exist`);
  }
}

module.exports = { validateCategory, existsCloheById };