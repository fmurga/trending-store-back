
const Category = require('../models/category');
const Role = require('../models/role');
const User = require('../models/user');
const Link = require('../models/links');
const Clothe = require('../models/clothe');


const validateRole = async (role = '') => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`Role ${role} does not exist`);
  }
  return true;

}

const existsEmail = async (email = '') => {
  const existEmail = await User.findOne({ email })
  if (existEmail) {
    throw new Error(`Email ${email} is already in use`);
  }
  return true;

}

const existsUserById = async (id) => {
  const existUser = await User.findById(id)
  if (!existUser) {
    throw new Error(`The Id ${id} does not exist`);
  }
  return true;

}

const existsCategoryById = async (id) => {
  const exist = await Category.findById(id)
  if (!exist) {
    throw new Error(`The Id ${id} does not exist`);
  }
  return true;

}

const existsLinkById = async (id) => {
  const exist = await Link.findById(id)
  if (!exist) {
    throw new Error(`The Id ${id} does not exist`);
  }
  return true;

}
const existsCategoryByName = async (name) => {
  const existByName = await Category.findOne({ name })
  if (existByName) {
    throw new Error(`The category ${name} already exist`);
  }
  return true;

}

const checkCategoryName = async (name) => {
  const existByName = await Category.findOne({ name })
  if (!existByName) {
    throw new Error(`The category ${name} does not exists`);
  }
  return true;

}


const existsCloheById = async (id) => {
  const existClothe = await Clothe.findById(id)
  if (!existClothe) {
    throw new Error(`The Id ${id} does not exist`);
  }
  return true;

}

const allowedCollection = (collection = '', collections = []) => {
  const included = collections.includes(collection);
  if (!included) {
    throw new Error(`The collection ${collection} is not permitted`);
  }
  return true;
}



module.exports = {
  validateRole,
  existsEmail,
  existsCategoryByName,
  checkCategoryName,
  existsCategoryById,
  existsUserById,
  existsLinkById,
  existsCloheById,
  allowedCollection
};