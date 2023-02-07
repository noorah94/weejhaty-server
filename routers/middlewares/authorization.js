const roleModel = require("./../../db/models/role");
const userModel = require("./../../db/models/users");

const adminAuthorization = async (req, res, next) => {
  const result = await roleModel.findById(req.token.role);
  if (result.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "forbidden" });
  }
};

const userAuthorization = async (req, res, next) => {
  const { userId } = req.body;

  // console.log(userId);
  // console.log(req.token.userId);
  if (req.token.userId === userId) {
    next();
  } else {
    res.status(403).json({ message: "forbidden" });
  }
};

const adminAndUserAuthorization = async (req, res, next) => {
  const { userId } = req.body;
  const result = await roleModel.findById(req.token.role);

  // console.log(userId);
  // console.log(req.token.userId);
  if (req.token.userId === userId || result.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "forbidden" });
  }
};

module.exports = {
  adminAuthorization,
  userAuthorization,
  adminAndUserAuthorization,
};
