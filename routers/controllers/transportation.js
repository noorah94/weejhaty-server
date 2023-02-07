const transportationModel = require("./../../db/models/transportation");

const addTransportation = (req, res) => {
  const { companyName, city, carType, model, image, price } = req.body;

  const newTransportation = new transportationModel({
    companyName,
    city,
    carType,
    model,
    image,
    price,
  });

  newTransportation
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

const getTransportation = (req, res) => {
  transportationModel
    .find({ isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getTransportationById = (req, res) => {
  const { id } = req.params;
  transportationModel
    .findOne({ _id: id, isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getTransportationByCity = (req, res) => {
  const { city } = req.params;
  console.log(city);
  transportationModel
    .find({ city, isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const updateTransportation = async (req, res) => {
  try {
    const {
      transportationId,
      companyName,
      city,
      carType,
      model,
      image,
      price,
    } = req.body;
    let doc = "";
    if (companyName !== undefined) {
      doc = await transportationModel.updateOne(
        { _id: transportationId },
        { companyName: companyName }
      );
    }

    if (city !== undefined) {
      doc = await transportationModel.updateOne(
        { _id: transportationId },
        { city: city }
      );
      console.log(doc);
    }

    if (carType !== undefined) {
      doc = await transportationModel.updateOne(
        { _id: transportationId },
        { carType: carType }
      );
      console.log(doc);
    }

    if (model !== undefined) {
      doc = await transportationModel.updateOne(
        { _id: transportationId },
        { model: model }
      );
      console.log(doc);
    }

    if (image !== undefined) {
      doc = await transportationModel.updateOne(
        { _id: transportationId },
        { image: image }
      );
      console.log(doc);
    }

    if (price !== undefined) {
      doc = await transportationModel.updateOne(
        { _id: transportationId },
        { price: price }
      );
      console.log(doc);
    }

    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

const delTransportation = async (req, res) => {
  const { transportationId } = req.body;

  try {
    let doc = await transportationModel.updateOne(
      { _id: transportationId },
      { isDel: true }
    );
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  addTransportation,
  getTransportation,
  getTransportationById,
  getTransportationByCity,
  updateTransportation,
  delTransportation,
};
