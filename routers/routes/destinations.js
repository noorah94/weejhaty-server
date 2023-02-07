const express = require("express");
const {
  addDestinations,
  getTop,
  getDestinations,
  getDestinationById,
  getDestinationByCatg,
  getDestinationByDays,
  getDestinationByCity,
  delDestination,
  updateDestination,

  getHNumOfOrders,
  getLPrice,
  getHPrice,
  getDown,
} = require("./../controllers/destinations.js");
const authentication = require("../middlewares/authentication");
const {
  adminAuthorization,
  userAuthorization,
  adminAndUserAuthorization,
} = require("../middlewares/authorization");

const destinations = express.Router();

destinations.post("/add", authentication, adminAuthorization, addDestinations);
destinations.put(
  "/update",
  authentication,
  adminAuthorization,
  updateDestination
);
destinations.get("/get", getDestinations);
destinations.get("/getHNumOfOrders", getHNumOfOrders);
destinations.get("/getLPrice", getLPrice);
destinations.get("/getHPrice", getHPrice);
destinations.get("/getDown", getDown);
destinations.get("/getTop", getTop);
destinations.get("/getDestinationById/:id", getDestinationById);
destinations.get("/getDestinationByCatg/:catg", getDestinationByCatg);
destinations.get("/getDestinationByDays/:days", getDestinationByDays);
destinations.get("/getDestinationByCity/:city", getDestinationByCity);
destinations.delete("/del", authentication, adminAuthorization, delDestination);

module.exports = destinations;
