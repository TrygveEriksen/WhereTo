const {
  findOneDestination,
  findAllDestinations,
  postNewDestination,
  deleteDestination,
  updateDestination,
} = require("../controllers/destinationController");

const { Router } = require("express");
const destinationRouter = Router();

destinationRouter.get("/", findAllDestinations);
destinationRouter.post("/new", postNewDestination);
destinationRouter.get("/:id", findOneDestination);
destinationRouter.delete("/delete/:id", deleteDestination);
destinationRouter.put("/update/:id", updateDestination);

module.exports = { destinationRouter };
