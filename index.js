const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

const app = express();
app.use(express.json()); //{ limit: "50mb" }
app.use(cors());

const role = require("./routers/routes/role");
app.use("/role", role);

const users = require("./routers/routes/users");
app.use("/users", users);

const hotels = require("./routers/routes/hotels");
app.use("/hotels", hotels);

const festivals = require("./routers/routes/festivals");
app.use("/festivals", festivals);

const destinations = require("./routers/routes/destinations");
app.use("/destinations", destinations);

const comments = require("./routers/routes/comments");
app.use("/comments", comments);

const transportation = require("./routers/routes/transportation");
app.use("/transportation", transportation);

const flights = require("./routers/routes/flights");
app.use("/flights", flights);

const touristGuides = require("./routers/routes/touristGuides");
app.use("/touristGuides", touristGuides);

const orders = require("./routers/routes/orders");
app.use("/orders", orders);

const dayInYourCity = require("./routers/routes/dayInYourCity");
app.use("/dayInYourCity", dayInYourCity);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});
