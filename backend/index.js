const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { destinationRouter } = require("./routers/destinationRouter");

const app = express();
app.use(express.json());
app.use(cors());

const dbUsername = "whereto72";
const dbPass = "kOIUq6hG3qlEWXiU";
const dbName = "whereto";

const url = `mongodb+srv://${dbUsername}:${dbPass}@cluster0.nzo0zib.mongodb.net/${dbName}`;
mongoose
  .connect(url)
  .then(() => console.log("connected to db"))
  .catch((err) => console.error("error connecting to db", err));

app.use("/destinations", destinationRouter);

app.listen(3001, () => {
  console.log("server is running");
});
