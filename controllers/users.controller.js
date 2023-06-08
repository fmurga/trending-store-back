const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const usersGet = async (req = request, res = response) => {
  const { limit = 10, from = 0 } = req.query;
  const query = { state: true }

  const users = await User.find(query)
    .skip(Number(from))
    .limit(Number(limit))

  const total = await User.countDocuments(query)

  const resp = await Promise.all([total, users]);

  res.json({
    limit: Number(limit),
    total: resp[0],
    users: resp[1],
  });
}

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { __id, password, googleSignedIn, email, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    user
  });
}

const usersPost = async (req, res = response) => {

  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Password encryption
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    user
  });
}

const usersDelete = async (req, res = response) => {

  const { id } = req.params;

  // const user = await User.findByIdAndDelete(id);
  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({
    msg: "User deleted",
    user,
  });
}

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
}