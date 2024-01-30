const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const DestinationModel = require("./models/Destination");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/TDT4140");

/*app.post('/', (req, res) => {
  DestinationModel.create(req.body)
  .then(destinations => res.json(destinations))
  .catch(error => res.json(error))
})*/

app.get("/destinations", async (req, res) => {
  try {
    const destinations = await DestinationModel.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("server is running");
});
