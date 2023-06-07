const { response, request } = require("express");
const Category = require("../models/Category");

const categorysGet = async (req = request, res = response) => {
  const { limit = 10, from = 0 } = req.query;
  const query = { state: true }

  const categorys = await Category.find(query)
    .skip(Number(from))
    .limit(Number(limit))

  const total = await Category.countDocuments(query)

  const resp = await Promise.all([total, categorys]);

  res.json({
    limit: Number(limit),
    total: resp[0],
    categorys: resp[1],
  });
}

const categorysPut = async (req, res = response) => {
  const { id } = req.params;
  const { __id, ...rest } = req.body;

  const category = await Category.findByIdAndUpdate(id, rest);

  res.json({
    category
  });
}

const categorysPost = async (req, res = response) => {

  const { name } = req.body;
  const category = new Category({ name });

  await category.save();

  res.json({
    category
  });
}

const categorysDelete = async (req, res = response) => {

  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(id, { state: false });

  res.json({
    msg: "Category deleted",
    category,
  });
}

module.exports = {
  categorysGet,
  categorysPut,
  categorysPost,
  categorysDelete,
}