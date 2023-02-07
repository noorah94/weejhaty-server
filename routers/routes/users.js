const express = require("express");
const authentication = require("../middlewares/authentication");
const {
  adminAuthorization,
  userAuthorization,
  adminAndUserAuthorization,
} = require("../middlewares/authorization");

const {
  register,
  login,
  getUsers,
  getUserById,
  delUser,
  verify,
  resetPassword,
  completeResetPassword,
  updateFavUser,
} = require("./../controllers/users.js");
const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);
userRouter.get("/verify/:id", verify);
userRouter.get("/get/:id", getUserById);
userRouter.post("/resetPassword", resetPassword);
userRouter.post("/completeResetPassword/:id", completeResetPassword);
userRouter.put(
  "/updateFavUser",
  authentication,
  userAuthorization,
  updateFavUser
);
userRouter.delete("/del", authentication, adminAndUserAuthorization, delUser);
userRouter.get("/getUsers", getUsers);

module.exports = userRouter;
