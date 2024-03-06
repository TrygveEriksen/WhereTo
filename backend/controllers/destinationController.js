const DestinationModel = require("../models/Destination");

const findAllDestinations = async (req, res) => {
  try {
    const destinations = await DestinationModel.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findOneDestination = async (req, res) => {
  try {
    const destinationId = req.params.id;
    const destination = await DestinationModel.findOne({
      _id: destinationId,
    });

    if (destination) {
      res.json(destination);
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
    res.status(400).json({ message: error.message });
  }
};

const deleteDestination = async (req, res) => {
  try {
    const destinationId = req.params.id;
    const deletedDestination = await DestinationModel.findByIdAndDelete(
      destinationId
    );
    if (deletedDestination) {
      res.status(200).json(deletedDestination);
    } else {
      res.status(404).json({ message: "Destination Not Found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDestination = async (req, res) => {
  try {
    const destinationId = req.params.id;
    const updatedDestination = await DestinationModel.findByIdAndUpdate(
      destinationId,
      req.body,
      { new: true }
    );
    if (updatedDestination) {
      res.status(200).json(updatedDestination);
    } else {
      res.status(404).json({ message: "Destination Not Found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  findAllDestinations,
  findOneDestination,
  postNewDestination,
  deleteDestination,
  updateDestination,
};
