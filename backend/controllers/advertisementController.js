const AdvertisementModel = require("../models/Advertisement");

const findOneRandomAdvertisement = async (req, res) => {
    try {
      const advertisements = await AdvertisementModel.find();

      // Finner en tilfeldig annonse
      const length = advertisements.length;
      const selected = Math.floor(Math.random() * length);
      const advertisement = advertisements[selected];

      res.json(advertisement);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const findOneAdvertisement = async (req, res) => {
    try {
        const advertisementId = req.params.id;
        const advertisement = await AdvertisementModel.findOne({
          _id: advertisementId,
        });
    
        if (advertisement) {
          res.json(advertisement);
        } else {
          res.status(404).json({ message: "Advertisement Not Found!" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

const postNewAdvertisement = async (req, res) => {
    try {
        const newAdvertisement = new AdvertisementModel(req.body);
        const savedAdvertisement = await newAdvertisement.save();
        res.status(201).json(savedAdvertisement);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { findOneRandomAdvertisement, findOneAdvertisement, postNewAdvertisement };