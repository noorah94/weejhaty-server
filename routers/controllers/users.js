const userModel = require("./../../db/models/users");
const usernameCounterModel = require("./../../db/models/usernameCounter");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("./../../utils/email");
//const userModel = users;

const SALT = Number(process.env.SALT);
const secretKey = process.env.secretKey;

const setPassword = async (password) => {
  if (
    password.length > 5 &&
    /\d/.test(password) &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)
  ) {
    const passwordHashed = await bcrypt.hash(password, SALT);
    return passwordHashed;
  }
  return -1;
};

const register = async (req, res) => {
  const { email, password, phoneNumber, role } = req.body;

  const savedEmail = email.toLowerCase().trim();

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(savedEmail).toLowerCase().trim()))
    res.status(401).send("email address is not correct");

  const passwordHashed = await setPassword(password);

  if (passwordHashed !== -1)
    userModel
      .find({})
      .then(async (result) => {
        // const found = result.find((item) => {
        //   return item.username == username.trim();
        // });
        // if (found) res.status(400).send("the username is exist");

        const found = result.find((item) => {
          return item.email == savedEmail && item.isDel == false;
        });
        if (found) res.status(400).send("the email is exist");
        else {
          const counter = await usernameCounterModel.findByIdAndUpdate(
            { _id: "61c99519aecbfc65718c5f65" },
            { $inc: { usernameCounter: 1 } }
          );

          const username = "w" + counter.usernameCounter;

          const newUser = new userModel({
            email: savedEmail,
            username,
            password: passwordHashed,
            role,
            phoneNumber,
          });

          newUser
            .save()
            .then(async (result) => {
              const message = `${process.env.BASE_URL}/users/verify/${result._id}`;
              console.log(message);
              await sendEmail(result.email, "Verify Email", message);
              res.status(201).json(result);
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  else {
    // console.log(password);
    res.status(400).send("the password is not complex");
  }
};

const verify = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id, isDel: false });

    if (!user) return res.status(400).send("Invalid link");

    await userModel.updateOne({ _id: user._id }, { verified: true });

    res.send("email verified sucessfully");
  } catch (error) {
    res.status(400).send("An error occured");
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
      isDel: false,
    });

    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    // const message = `http://localhost:3000/completeResetPassword/${user._id}`;
    // await sendEmail(user.email, "Verify Email", message);
    // console.log(user.email);

    const message = `${process.env.FRONT_URL}/users/completeResetPassword/${user._id}`;
    console.log(message);
    await sendEmail(user.email, "Verify Email", message);
    //res.status(201).json(result);

    res.send("password reset link sent to your email account");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
};
const completeResetPassword = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(400).send("invalid link or expired");
    console.log(req.body.password);

    const passwordHashed = await setPassword(req.body.password);
    console.log(passwordHashed);

    if (passwordHashed !== -1) {
      user.password = passwordHashed;
      await user.save();
      res.send("password reset sucessfully.");
    }

    res.send("Password not complex");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
};

const login = (req, res) => {
  const { email, password } = req.body;
  const editedEmail = email.toLowerCase().trim();

  userModel
    .find({
      email: editedEmail,
      verified: true,
      isDel: false,
    })
    .then(async (result) => {
      if (result) {
        if (editedEmail === result[0].email) {
          const hashedPass = await bcrypt.compare(password, result[0].password);

          if (hashedPass) {
            const payload = {
              role: result[0].role,
              userId: result[0]._id,
            };
            const options = {
              expiresIn: "60m",
            };

            const token = await jwt.sign(payload, secretKey, options);

            res.status(200).json({ result, token });
          } else {
            res.status(400).json("email or password is not correct");
          }
        } else {
          res.status(400).json("email or password is not correct");
        }
      } else {
        res.status(400).json("email not found");
      }
    })
    .catch((err) => {
      res.status(400).json("email or password is not correct");
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  userModel
    .findOne({ _id: id, isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getUsers = (req, res) => {
  userModel
    .find({})
    .select("_id username")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const updateFavUser = async (req, res) => {
  const { id, fav } = req.body;

  // console.log(fav);

  let doc = await userModel.updateOne({ _id: id }, { fav: fav });
  res.status(200).json(doc);
};

const delUser = async (req, res) => {
  const { id } = req.body;

  let doc = await userModel.updateOne({ _id: id }, { isDel: true });
  res.status(200).json(doc);
};

module.exports = {
  register,
  updateFavUser,
  verify,
  login,
  getUserById,
  getUsers,
  delUser,
  resetPassword,
  completeResetPassword,
};
