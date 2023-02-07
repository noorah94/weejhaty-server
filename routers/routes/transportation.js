const express = require("express");
const {
  addTransportation,
  getTransportation,
  updateTransportation,
  delTransportation,
  getTransportationById,
  getTransportationByCity,
} = require("./../controllers/transportation.js");
const transportation = express.Router();

const authentication = require("../middlewares/authentication");
const {
  adminAuthorization,
  userAuthorization,
  adminAndUserAuthorization,
} = require("../middlewares/authorization");

transportation.post(
  "/add",
  authentication,
  adminAuthorization,
  addTransportation
);
transportation.put(
  "/update",
  authentication,
  adminAuthorization,
  updateTransportation
);
transportation.get("/get", getTransportation);
transportation.get("/get/:id", getTransportationById);
transportation.get("/getByCity/:city", getTransportationByCity);
transportation.delete(
  "/del",
  authentication,
  adminAuthorization,
  delTransportation
);

module.exports = transportation;
