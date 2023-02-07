const mongoose = require("mongoose");

const touristGuides = new mongoose.Schema({
  avter: { type: String, required: true, trim: true },
  fname: { type: String, required: true, trim: true },
  lname: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  isDel: { type: Boolean, default: false },
});

module.exports = mongoose.model("touristGuides", touristGuides);
