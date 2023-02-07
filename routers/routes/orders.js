const express = require("express");
const {
  addOrder,
  getOrders,
  delOrder,
  rejectOrder,
  acceptOrder,
} = require("./../controllers/orders.js");
const authentication = require("../middlewares/authentication");
const {
  adminAuthorization,
  userAuthorization,
  adminAndUserAuthorization,
} = require("../middlewares/authorization");
const orders = express.Router();

orders.post("/add", authentication, userAuthorization, addOrder);
orders.put("/acceptOrder", authentication, adminAuthorization, acceptOrder);
orders.put("/rejectOrder", authentication, adminAuthorization, rejectOrder);
orders.get("/get", getOrders);
orders.delete("/del", authentication, adminAndUserAuthorization, delOrder);

module.exports = orders;
