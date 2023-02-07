const mongoose = require("mongoose");

const orders = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  destinationId: { type: mongoose.Schema.Types.ObjectId, ref: "destinations" },
  transportationId: { type: String },
  hotelId: { type: String },
  touristGuideId: { type: String },
  ticket: { type: Array },
  numOfPeople: { type: Number, required: true },
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: false },
  process: { type: String, default: "pending" },
  isDel: { type: Boolean, default: false },
});

module.exports = mongoose.model("orders", orders);
