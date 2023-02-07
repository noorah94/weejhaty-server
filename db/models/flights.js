const mongoose = require("mongoose");

const flights = new mongoose.Schema({
  from: { type: String, required: true, trim: true },
  to: { type: String, required: true, trim: true },
  flightClass: { type: String, required: true, trim: true },
  adultTicketPrice: { type: Number, required: true },
  childTicketPrice: { type: Number, required: true },
  infantTicketPrice: { type: Number, required: true },
  isDel: { type: Boolean, default: false },
});

module.exports = mongoose.model("flights", flights);
