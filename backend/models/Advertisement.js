const mongoose = require("mongoose");

const AdvertisementSchema = new mongoose.Schema({
  title: {type: String, required: true},
  img: {type: String, required: true} ,
  imgLink: {type: String, required: true},
});

const AdvertisementModel = mongoose.model("advertisements", AdvertisementSchema);
module.exports = AdvertisementModel;