
const { v4: uuidv4 } = require('uuid');
const path = require("path");

const uploadFileHelper = (files, validExtension = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

  return new Promise((resolve, reject) => {
    const { file } = files

    const trimedName = file.name.split('.');

    const extension = trimedName[trimedName.length - 1];

    if (!validExtension.includes(extension)) {
      return reject(`The extension ${extension} is not in the ${validExtension} list`)
    }

    const tempFileName = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname + '../uploads/', folder, tempFileName);

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(uploadPath);
    });
  });

}

module.exports = { uploadFileHelper }