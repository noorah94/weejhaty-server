const express = require("express");
const { addRole, getRoles } = require("./../controllers/role.js");
const authentication = require("../middlewares/authentication");
const {
  adminAuthorization,
  userAuthorization,
  adminAndUserAuthorization,
} = require("../middlewares/authorization");

const roleRouter = express.Router();

roleRouter.post("/addRole", authentication, adminAuthorization, addRole);
roleRouter.get("/getRoles", authentication, adminAuthorization, getRoles);

module.exports = roleRouter;
