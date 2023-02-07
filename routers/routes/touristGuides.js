const express = require("express");
const {
  addTouristGuides,
  getTouristGuides,
  getTouristGuideById,
  delTouristGuides,
  updateTouristGuides,
  getTouristGuidesByCity,
} = require("./../controllers/touristGuides.js");
const touristGuides = express.Router();

const authentication = require("../middlewares/authentication");
const {
  adminAuthorization,
  userAuthorization,
  adminAndUserAuthorization,
} = require("../middlewares/authorization");

touristGuides.post(
  "/add",
  authentication,
  adminAuthorization,
  addTouristGuides
);
touristGuides.put(
  "/update",
  authentication,
  adminAuthorization,
  updateTouristGuides
);
touristGuides.get("/get", getTouristGuides);
touristGuides.get("/get/:id", getTouristGuideById);
touristGuides.get("/getByCity/:city", getTouristGuidesByCity);
touristGuides.delete(
  "/del",
  authentication,
  adminAuthorization,
  delTouristGuides
);

module.exports = touristGuides;
