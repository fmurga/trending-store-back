const { response } = require("express");
const { uploadFileHelper } = require("../helpers/uploadFile");
const User = require("../models/user");
const Clothe = require("../models/clothe");
const { validateFile } = require("../middlewares/validateFile");
const fs = require("fs");
const path = require("path");

const uploadFile = async (req, res = response) => {

  validateFile;

  try {
    const name = await uploadFileHelper(req.files, undefined, 'images');

    res.json({ name })
  } catch (msg) {
    res.status(400).json({ msg });
  }

}


const updateFile = async (req, res) => {

  const { id, collection } = req.params;

  validateFile;

  let model;

  switch (model) {
    case 'users':
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({ msg: `User with id ${id} not found` });
      }
      break;
    case 'clothes':
      model = await Clothe.findById(id)
      if (!model) {
        return res.status(400).json({ msg: `Clothe with id ${id} not found` });
      }
      break;
    default:
      return res.status(500).json({ msg: 'Internal Server Error' });
  }

  if (model.img) {
    const pathImg = path.join(__dirname, '../uploads', collection, model.img);
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg);
    }
  }

  const name = await uploadFileHelper(req.files, undefined, collection)
  model.img = name;
  res.json({
    model
  })
}

const showImage = async (req, res) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({ msg: `User with id ${id} not found` });
      }
      break;
    case 'clothes':
      model = await Clothe.findById(id)
      if (!model) {
        return res.status(400).json({ msg: `Clothe with id ${id} not found` });
      }
      break;
    default:
      return res.status(500).json({ msg: 'Internal Server Error' });
  }

  if (model.img) {
    const pathImg = path.join(__dirname, '../uploads', collection, model.img);
    if (fs.existsSync(pathImg)) {
      res.sendFile(pathImg)
    }
  }

  const placeholder = path.join(__dirname, '../assets/no-image.jpg')

  res.sendFile(placeholder)

}

module.exports = {
  uploadFile,
  updateFile,
  showImage
}