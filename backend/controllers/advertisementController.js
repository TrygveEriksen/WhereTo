const AdvertisementModel = require("../models/Advertisement");

  const findOneRandomAdvertisement = async (req, res) => {
    try {
      const advertisement = await AdvertisementModel.aggregate([
        { $sample: { size: 1 } }
    ]);
      res.json(advertisement[0]);
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
      if(req.user.permission!=1){
        return res.json({error: "Not admin"});
      }
        const newAdvertisement = new AdvertisementModel(req.body);
        const savedAdvertisement = await newAdvertisement.save();
        res.status(201).json(savedAdvertisement);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const findAllAdvertisements = async (req, res) => {
  try {
    const advertisements = await AdvertisementModel.find().select("title");

    
    res.json(advertisements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAdvertisement = async (req, res) => {
  try {
    if(req.user.permission!=1){
      return res.json({error: "Not admin"});
    }
    console.log(req.params.id);
    const adId = req.params.id;
    const deletedAd = await AdvertisementModel.findByIdAndDelete(
      adId
      
    );
    console.log("Det slettes");
    if (deletedAd) {
      res.status(200).json(deletedAd);
    } else { 
      res.status(404).json({ message: "Ad Not Found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { findOneRandomAdvertisement, findOneAdvertisement, postNewAdvertisement, findAllAdvertisements, deleteAdvertisement };