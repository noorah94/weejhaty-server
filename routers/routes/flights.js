const express = require("express");
const {
  addFlights,
  getFlights,
  getFlightsById,
  getFlightsByCity,
  delFlights,
  updateFlights,
} = require("./../controllers/flights.js");
const authentication = require("../middlewares/authentication");
const {
  adminAuthorization,
  userAuthorization,
  adminAndUserAuthorization,
} = require("../middlewares/authorization");

const flights = express.Router();

flights.post("/add", authentication, adminAuthorization, addFlights);
flights.put("/update", authentication, adminAuthorization, updateFlights);
flights.get("/get", getFlights);
flights.get("/get/:id", getFlightsById);
flights.get("/getByCity/:to", getFlightsByCity);
flights.delete("/del", authentication, adminAuthorization, delFlights);

module.exports = flights;
