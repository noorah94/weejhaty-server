const festivals = require("./../../db/models/festivals");

const addFestivals = (req, res) => {
  const { name, city, desc, imge, map, cost } = req.body;

  const newFestivals = new festivals({
    name,
    city,
    desc,
    imge,
    map,
    cost,
  });

  newFestivals
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

const getFestivals = (req, res) => {
  festivals
    .find({ isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const updateFestivals = async (req, res) => {
  try {
    const { festivalId, name, city, desc, imge, map, cost } = req.body;
    let doc = "";
    if (name !== undefined) {
      doc = await festivals.updateOne({ _id: festivalId }, { name: name });
    }

    if (city !== undefined) {
      doc = await festivals.updateOne({ _id: festivalId }, { city: city });
      console.log(doc);
    }

    if (desc !== undefined) {
      doc = await festivals.updateOne({ _id: festivalId }, { desc: desc });
      console.log(doc);
    }

    if (imge !== undefined) {
      doc = await festivals.updateOne({ _id: festivalId }, { imge: imge });
      console.log(doc);
    }

    if (catg !== undefined) {
      doc = await festivals.updateOne({ _id: festivalId }, { catg: catg });
      console.log(doc);
    }

    if (map !== undefined) {
      doc = await festivals.updateOne({ _id: festivalId }, { map: map });
      console.log(doc);
    }

    if (cost !== undefined) {
      doc = await festivals.updateOne({ _id: festivalId }, { cost: cost });
      console.log(doc);
    }

    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

const delFestivals = async (req, res) => {
  const { festivalId } = req.body;

  try {
    let doc = await festivals.updateOne({ _id: festivalId }, { isDel: true });
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { addFestivals, getFestivals, delFestivals, updateFestivals };
