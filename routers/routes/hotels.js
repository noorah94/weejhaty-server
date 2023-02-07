const express = require("express");
const {
  addHotels,
  getHotels,
  delHotel,
  updateHotels,
  getHotelById,
  getDestinationByCity,
} = require("./../controllers/hotels.js");
const authentication = require("../middlewares/authentication");
const {
  adminAuthorization,
  userAuthorization,
  adminAndUserAuthorization,
} = require("../middlewares/authorization");
const hotels = express.Router();

hotels.post("/add", authentication, adminAuthorization, addHotels);
hotels.put("/update", authentication, adminAuthorization, updateHotels);
hotels.get("/get", getHotels);
hotels.get("/get/:id", getHotelById);
hotels.get("/getByCity/:city", getDestinationByCity);
hotels.delete("/del", authentication, adminAuthorization, delHotel);

module.exports = hotels;
