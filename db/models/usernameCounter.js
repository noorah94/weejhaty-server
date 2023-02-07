const mongoose = require("mongoose");

const usernameCounter = new mongoose.Schema({
  usernameCounter: { type: Number, default: 0 },
});

module.exports = mongoose.model("usernameCounter", usernameCounter);
