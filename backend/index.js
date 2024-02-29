const express = require("express");
const mongoose = require("mongoose");

const { entryRouter } = require("./routers/entryRouter");
const { reviewRouter } = require("./routers/reviewRouter");
const cors = require("cors");
const { AuthMiddleware } = require("./routers/middelware");
const { destinationRouter } = require("./routers/destinationRouter");
const { secrets } = require("./secrets");
const { adminRouter } = require("./routers/adminRouter");

const app = express();
app.use(express.json());
app.use(cors());

const url = `mongodb+srv://${secrets.db.username}:${secrets.db.password}@cluster0.nzo0zib.mongodb.net/${secrets.db.name}`;
mongoose
  .connect(url)
  .then(() => console.log("connected to db"))
  .catch((err) => console.error("error connecting to db", err));

app.use("/entry", entryRouter);
//everything under middleware is now hidden from unathourized users
app.use(AuthMiddleware);
app.use("/destinations", destinationRouter);
app.use("/review", reviewRouter);
app.use("/admin", adminRouter);
app.get("/getUser", (req, res) => res.json(req.user));

app.listen(3001, () => {
  console.log("server is running");
});
