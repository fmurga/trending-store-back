const { response, request } = require("express");
const Order = require("../models/order");


const ordersGet = async (req = request, res = response) => {
  const { limit = 10, from = 0, id } = req.query;
  const query = {}

  const orders = await Order
    .find(query)
    .skip(Number(from))
    .limit(Number(limit))

  const total = await Order.countDocuments(query)

  const resp = await Promise.all([total, orders]);

  res.json({
    limit: Number(limit),
    total: resp[0],
    orders: resp[1],
  });
}

const ordersPut = async (req, res = response) => {
  const { id } = req.params;
  const { __id, ...rest } = req.body;



  const order = await Order.findByIdAndUpdate(id, rest).


    res.json({
      order
    });
}

const ordersPost = async (req, res = response) => {

  const { total, buyer, detail } = req.body;
  const order = new Order({ buyer, detail, total });

  console.log(order)

  await order.save();

  res.json({
    order
  });
}

const ordersDelete = async (req, res = response) => {
  const { id } = req.params;

  const order = await Order.findByIdAndUpdate(id, { state: false });

  res.json({
    msg: "order deleted",
    order
  });
}

module.exports = {
  ordersGet,
  ordersPut,
  ordersPost,
  ordersDelete,
}

