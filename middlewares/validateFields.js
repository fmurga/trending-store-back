const { validationResult } = require("express-validator")

const validateFieds = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.errors,
    })
  }

  next()
}

module.exports = validateFieds