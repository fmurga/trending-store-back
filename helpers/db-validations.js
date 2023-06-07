
const Category = require('../models/category');
const Role = require('../models/role');
const User = require('../models/user');
const Link = require('../models/links');


const validateRole = async (role = '') => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`Role ${role} does not exist`);
  }
}

const existsEmail = async (email = '') => {
  const existEmail = await User.findOne({ email })
  if (existEmail) {
    throw new Error(`Email ${email} is already in use`);
  }
}

const existsUserById = async (id) => {
  const existUser = await User.findById(id)
  if (!existUser) {
    throw new Error(`The Id ${id} does not exist`);
  }
}

const existsCategoryById = async (id) => {
  const exist = await Category.findById(id)
  if (!exist) {
    throw new Error(`The Id ${id} does not exist`);
  }
}

const existsLinkById = async (id) => {
  const exist = await Link.findById(id)
  if (!exist) {
    throw new Error(`The Id ${id} does not exist`);
  }
}
const existsCategory = async (name) => {
  const existByName = await Category.findOne({ name })
  if (existByName) {
    throw new Error(`The category ${name} already exist`);
  }
}


module.exports = { validateRole, existsEmail, existsCategory, existsCategoryById, existsUserById, existsLinkById };