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

const postNewDestination = async (req, res) => {
  try {
    const newDestination = new DestinationModel(req.body);
    const savedDestination = await newDestination.save();
    res.status(201).json(savedDestination);
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

module.exports = { findAllDestinations, findOneDescription, postNewDestination };
