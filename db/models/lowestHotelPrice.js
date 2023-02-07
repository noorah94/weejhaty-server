const mongoose = require("mongoose");

const lowestHotelPrice = new mongoose.Schema({
  city: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("lowestHotelPrice", lowestHotelPrice);
