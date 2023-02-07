const hotels = require("./../../db/models/hotels");

const addHotels = (req, res) => {
  const { name, city, desc, imges, map, moreInfo, hotelInfo, reviews } =
    req.body;

  const newHotel = new hotels({
    name,
    city,
    desc,
    imges,
    map,
    moreInfo,
    hotelInfo,
    reviews,
  });

  newHotel
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

const getHotels = (req, res) => {
  hotels
    .find({ isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getHotelById = (req, res) => {
  const { id } = req.params;
  hotels
    .findOne({ _id: id, isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getDestinationByCity = (req, res) => {
  const { city } = req.params;
  console.log(city);
  hotels
    .find({ city, isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const updateHotels = async (req, res) => {
  try {
    const {
      hotelId,
      name,
      city,
      desc,
      imges,
      map,
      moreInfo,
      hotelInfo,
      reviews,
    } = req.body;
    let doc = "";
    if (name !== undefined) {
      doc = await hotels.updateOne({ _id: hotelId }, { name: name });
    }

    if (city !== undefined) {
      doc = await hotels.updateOne({ _id: hotelId }, { city: city });
      console.log(doc);
    }

    if (desc !== undefined) {
      doc = await hotels.updateOne({ _id: hotelId }, { desc: desc });
      console.log(doc);
    }

    if (imges !== undefined) {
      doc = await hotels.updateOne({ _id: hotelId }, { imges: imges });
      console.log(doc);
    }

    if (moreInfo !== undefined) {
      doc = await hotels.updateOne({ _id: hotelId }, { moreInfo: moreInfo });
      console.log(doc);
    }

    if (map !== undefined) {
      doc = await hotels.updateOne({ _id: hotelId }, { map: map });
      console.log(doc);
    }

    if (hotelInfo !== undefined) {
      doc = await hotels.updateOne(
        { _id: festivalId },
        { hotelInfo: hotelInfo }
      );
      console.log(doc);
    }

    if (reviews !== undefined) {
      doc = await hotels.updateOne({ _id: festivalId }, { reviews: reviews });
      console.log(doc);
    }

    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

const delHotel = async (req, res) => {
  const { hotelId } = req.body;

  try {
    let doc = await hotels.updateOne({ _id: hotelId }, { isDel: true });
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  addHotels,
  getHotels,
  delHotel,
  updateHotels,
  getHotelById,
  getDestinationByCity,
};
