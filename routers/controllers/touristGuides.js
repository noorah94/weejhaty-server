const touristGuidesModel = require("./../../db/models/touristGuides");

const addTouristGuides = (req, res) => {
  const { avter, fname, lname, city, mobile } = req.body;

  const newTouristGuides = new touristGuidesModel({
    avter,
    fname,
    lname,
    city,
    mobile,
  });

  newTouristGuides
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

const getTouristGuides = (req, res) => {
  touristGuidesModel
    .find({ isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const updateTouristGuides = async (req, res) => {
  try {
    const { touristGuidesId, avter, fname, lname, city, mobile } = req.body;
    let doc = "";
    if (avter !== undefined) {
      doc = await touristGuidesModel.updateOne(
        { _id: touristGuidesId },
        { avter: avter }
      );
    }

    if (fname !== undefined) {
      doc = await touristGuidesModel.updateOne(
        { _id: touristGuidesId },
        { fname: fname }
      );
      console.log(doc);
    }

    if (lname !== undefined) {
      doc = await touristGuidesModel.updateOne(
        { _id: touristGuidesId },
        { lname: lname }
      );
      console.log(doc);
    }

    if (city !== undefined) {
      doc = await touristGuidesModel.updateOne(
        { _id: touristGuidesId },
        { city: city }
      );
      console.log(doc);
    }

    if (mobile !== undefined) {
      doc = await touristGuidesModel.updateOne(
        { _id: touristGuidesId },
        { mobile: mobile }
      );
      console.log(doc);
    }

    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTouristGuidesByCity = (req, res) => {
  const { city } = req.params;

  touristGuidesModel
    .find({ isDel: false })
    .then((result1) => {
      const result = result1.filter((item) => {
        let arr = item.city.split("-");
        const newArr = arr.map((item2) => item2.trim());

        return newArr.includes(city);
      });
      //console.log("        ........" + result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getTouristGuideById = (req, res) => {
  const { id } = req.params;
  touristGuidesModel
    .findOne({ _id: id, isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const delTouristGuides = async (req, res) => {
  const { touristGuidesId } = req.body;

  try {
    let doc = await touristGuidesModel.updateOne(
      { _id: touristGuidesId },
      { isDel: true }
    );
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  addTouristGuides,
  getTouristGuides,
  getTouristGuideById,
  getTouristGuidesByCity,
  updateTouristGuides,
  delTouristGuides,
};
