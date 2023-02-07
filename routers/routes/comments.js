const express = require("express");
const {
  addComment,
  delComment,
  getCommentsForArticle,
  getCommentsForUser,
} = require("./../controllers/comments.js");
const authentication = require("../middlewares/authentication");
const {
  adminAuthorization,
  userAuthorization,
  adminAndUserAuthorization,
} = require("../middlewares/authorization");
const comments = express.Router();

comments.post("/add", authentication, userAuthorization, addComment);
comments.get("/getCommentsForArticle/:id", getCommentsForArticle);
comments.get("/getCommentsForUser/:id", getCommentsForUser);
comments.delete("/del", authentication, adminAndUserAuthorization, delComment);

module.exports = comments;
