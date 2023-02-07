const ordersModel = require("./../../db/models/orders");
const usersModel = require("./../../db/models/users");
const sendEmail = require("./../../utils/email");

const addOrder = (req, res) => {
  const {
    userId,
    destinationId,
    transportationId,
    hotelId,
    touristGuideId,
    ticket,
    numOfPeople,
    price,
  } = req.body;
  console.log(
    userId,
    destinationId,
    transportationId,
    hotelId,
    touristGuideId,
    ticket,
    numOfPeople,
    price
  );

  const newOrder = new ordersModel({
    userId,
    destinationId,
    transportationId,
    hotelId,
    touristGuideId,
    ticket,
    numOfPeople,
    price,
  });

  newOrder
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

const getOrders = (req, res) => {
  ordersModel
    .find({ isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const delOrder = async (req, res) => {
  const { orderId } = req.body;

  try {
    let doc = await ordersModel.updateOne({ _id: orderId }, { isDel: true });
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

const acceptOrder = async (req, res) => {
  const { orderId, process, userId } = req.body;

  try {
    let doc = await ordersModel.updateOne({ _id: orderId }, { process });
    let user = await usersModel.findOne({ _id: userId, isDel: false });
    const message = `تم قبول الطلب`;
    await sendEmail(user.email, "order", message);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

const rejectOrder = async (req, res) => {
  const { orderId, process, userId } = req.body;

  try {
    let doc = await ordersModel.updateOne({ _id: orderId }, { process });
    let user = await usersModel.findOne({ _id: userId, isDel: false });
    const message = `تم رفض الطلب`;
    await sendEmail(user.email, "order", message);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { addOrder, getOrders, delOrder, rejectOrder, acceptOrder };
