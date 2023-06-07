const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const generateJWT = require("../helpers/generateJWT");


const login = async (req, res = response) => {

  const { email, password } = req.body;


  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User or password are incorrect - email" });
    }

    if (user.state === false) {
      return res.status(400).json({ msg: "User or password are incorrect - state" });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "User or password are incorrect - password" });
    }

    const token = await generateJWT();

    res.json({
      msg: "Login successful"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'There was an error talk to an administrator' });
  }

}

module.exports = {
  login
}