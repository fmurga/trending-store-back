const { response } = require("express");
const { uploadFileHelper } = require("../helpers/uploadFile");
const User = require("../models/user");
const Clothe = require("../models/clothe");
const fs = require("fs");
const path = require("path");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);


const uploadFile = async (req, res = response) => {


  try {
    const name = await uploadFileHelper(req.files, undefined, 'images');
    console.log(name)
    res.json({ name })
  } catch (msg) {
    res.status(400).json({ msg });
  }

}


const updateFile = async (req, res) => {

  const { id, collection } = req.params;


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

const updateFileCloud = async (req, res = response) => {

  const { id, collection } = req.params;
  console.log(collection)
  let modelo;

  switch (collection) {
    case 'users':
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        });
      }

      break;

    case 'clothes':
      modelo = await Clothe.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        });
      }

      break;

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto' });
  }


  // Limpiar imágenes previas
  if (modelo.img) {
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split('.');
    cloudinary.uploader.destroy(public_id);
  }


  const { tempFilePath } = req.files.file
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  modelo.img = secure_url;

  await modelo.save();


  res.json(modelo);

}

module.exports = {
  uploadFile,
  updateFileCloud,
  updateFile,
  showImage
}