const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const DestinationModel = mongoose.model("destinations", DestinationSchema);
module.exports = DestinationModel;
