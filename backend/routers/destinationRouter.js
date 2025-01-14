const {
  findOneDestination,
  findAllDestinations,
  postNewDestination,
  deleteDestination,
  updateDestination,
  getVisitedPlaces
} = require("../controllers/destinationController");

const { Router } = require("express");
const destinationRouter = Router();

destinationRouter.get("/", findAllDestinations);
destinationRouter.get("/getVisitedPlaces", getVisitedPlaces);
destinationRouter.post("/new", postNewDestination)
destinationRouter.get("/:id", findOneDestination);
destinationRouter.delete("/delete/:id", deleteDestination);
destinationRouter.put("/update/:id", updateDestination);

module.exports = { destinationRouter };
