const { response, request } = require("express");
const Clothe = require("../models/clothe");


const clothesGet = async (req = request, res = response) => {
  const { limit = 10, from = 0, id } = req.query;
  const query = { state: true }

  const clothes = await Clothe
    .find(query)
    .populate('category', 'name')
    .skip(Number(from))
    .limit(Number(limit))

  const total = await Clothe.countDocuments(query)

  const resp = await Promise.all([total, clothes]);

  res.json({
    limit: Number(limit),
    total: resp[0],
    clothes: resp[1],
  });
}

const getClotheById = async (req = request, res = response) => {

  const { id } = req.params;

  const clothe = await Clothe.findOne({ _id: id })
    .populate('category', 'name');

  res.json(clothe);
}


const clothesPut = async (req, res = response) => {
  const { id } = req.params;
  const { __id, ...rest } = req.body;
  const clothe = await Clothe.findByIdAndUpdate(id, rest)


  res.json({
    clothe
  });
}

const clothesPost = async (req, res = response) => {

  const { name, price, stock, description, initial, pictureUrl, category, sizes } = req.body;
  const clothe = new Clothe({ name, price, stock, description, initial, pictureUrl, category, sizes });

  await clothe.save();

  res.json({
    clothe
  });
}

const clothesDelete = async (req, res = response) => {
  const { id } = req.params;

  const clothe = await Clothe.findByIdAndUpdate(id, { state: false });

  res.json({
    msg: "Clothe deleted",
    clothe
  });
}

module.exports = {
  clothesGet,
  clothesPut,
  clothesPost,
  clothesDelete,
  getClotheById
}

