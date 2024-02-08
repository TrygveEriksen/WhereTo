const DestinationModel = require("../models/Destination");

const findAllDestinations = async (req, res) => {
  try {
    const destinations = await DestinationModel.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findOneDescription = async (req, res) => {
  try {
    const destinationId = req.params.id;
    const destination = await DestinationModel.findOne({
      _id: destinationId,
    });

    if (destination) {
      res.json({ description: destination.description });
    } else {
      res.status(404).json({ message: "Destinasjon ikke funnet!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { findAllDestinations, findOneDescription };
