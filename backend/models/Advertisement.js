const mongoose = require("mongoose");

const AdvertisementSchema = new mongoose.Schema({
  title: {type: String, required: true},
  img: {type: String},
});

const AdvertisementModel = mongoose.model("advertisements", AdvertisementSchema);
module.exports = AdvertisementModel;