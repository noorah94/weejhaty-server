const flightsModel = require("./../../db/models/flights");

const addFlights = (req, res) => {
  const {
    from,
    to,
    flightClass,
    adultTicketPrice,
    childTicketPrice,
    infantTicketPrice,
  } = req.body;

  const newFlights = new flightsModel({
    from,
    to,
    flightClass,
    adultTicketPrice,
    childTicketPrice,
    infantTicketPrice,
  });

  newFlights
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

const getFlights = (req, res) => {
  flightsModel
    .find({ isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getFlightsByCity = (req, res) => {
  const { to } = req.params;
  flightsModel
    .find({ to, isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getFlightsById = (req, res) => {
  const { id } = req.params;
  flightsModel
    .findOne({ _id: id, isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const updateFlights = async (req, res) => {
  try {
    const {
      flightsId,
      from,
      to,
      flightClass,
      adultTicketPrice,
      childTicketPrice,
      infantTicketPrice,
    } = req.body;
    let doc = "";
    if (from !== undefined) {
      doc = await flightsModel.updateOne({ _id: flightsId }, { from: from });
    }

    if (to !== undefined) {
      doc = await flightsModel.updateOne({ _id: flightsId }, { to: to });
      console.log(doc);
    }

    if (flightClass !== undefined) {
      doc = await flightsModel.updateOne(
        { _id: flightsId },
        { flightClass: flightClass }
      );
      console.log(doc);
    }

    if (adultTicketPrice !== undefined) {
      doc = await flightsModel.updateOne(
        { _id: flightsId },
        { adultTicketPrice: adultTicketPrice }
      );
      console.log(doc);
    }

    if (childTicketPrice !== undefined) {
      doc = await flightsModel.updateOne(
        { _id: flightsId },
        { childTicketPrice: childTicketPrice }
      );
      console.log(doc);
    }

    if (infantTicketPrice !== undefined) {
      doc = await flightsModel.updateOne(
        { _id: flightsId },
        { infantTicketPrice: infantTicketPrice }
      );
      console.log(doc);
    }

    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

const delFlights = async (req, res) => {
  const { flightsId } = req.body;

  try {
    let doc = await flightsModel.updateOne({ _id: flightsId }, { isDel: true });
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  addFlights,
  getFlights,
  getFlightsById,
  getFlightsByCity,
  delFlights,
  updateFlights,
};
