const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJwt = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({ msg: 'Theres is no token in the request' });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({ msg: 'Token is not valid - user is not in DB' });
    }

    if (!user.state) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }

    req.user = user;

    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = validateJwt;