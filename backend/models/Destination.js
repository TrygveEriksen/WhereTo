const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema({
  description: {type: String, required: true},
  place: {type: String, required: true},
  country: {type: String, required: true},
  labels:  [String], //Bør kanskje endres på senere?
  continent: {type: String, required: true},
  img: {type: String}
});

const DestinationModel = mongoose.model("destinations", DestinationSchema);
module.exports = DestinationModel;