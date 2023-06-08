const { response, request } = require("express");
const Links = require("../models/links");

const linksGet = async (req = request, res = response) => {
  const { limit = 10, from = 0 } = req.query;
  const query = { state: true }

  const links = await Links.find(query)
    .skip(Number(from))
    .limit(Number(limit))

  const total = await Links.countDocuments(query)

  const resp = await Promise.all([total, links]);

  res.json({
    limit: Number(limit),
    total: resp[0],
    links: resp[1],
  });
}

const linksPut = async (req, res = response) => {
  const { id } = req.params;
  const { __id, ...rest } = req.body;

  const link = await Links.findByIdAndUpdate(id, rest);

  res.json({
    link
  });
}

const linksPost = async (req, res = response) => {

  const { name, path, subcategories } = req.body;
  const link = new Links({ name, path, subcategories });

  await link.save();

  res.json({
    link
  });
}

const linksDelete = async (req, res = response) => {

  const { id } = req.params;

  const link = await Links.findByIdAndUpdate(id, { state: false });

  res.json({
    msg: "Link deleted",
    link,
  });
}

module.exports = {
  linksGet,
  linksPut,
  linksPost,
  linksDelete,
}