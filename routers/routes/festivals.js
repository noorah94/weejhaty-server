const express = require("express");
const {
  addFestivals,
  getFestivals,
  delFestivals,
  updateFestivals,
} = require("./../controllers/festivals.js");
const authentication = require("../middlewares/authentication");
const {
  adminAuthorization,
  userAuthorization,
  adminAndUserAuthorization,
} = require("../middlewares/authorization");

const festivals = express.Router();

festivals.post("/add", authentication, adminAuthorization, addFestivals);
festivals.put("/update", updateFestivals);
festivals.get("/get", getFestivals);
festivals.delete("/del", authentication, adminAuthorization, delFestivals);

module.exports = festivals;
