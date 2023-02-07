const mongoose = require("mongoose");

const transportation = new mongoose.Schema({
  companyName: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  carType: { type: String, required: true, trim: true },
  model: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  isDel: { type: Boolean, default: false },
});

module.exports = mongoose.model("transportation", transportation);
