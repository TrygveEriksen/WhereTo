const {
  findOneDestination,
  findAllDestinations,
  postNewDestination
} = require("../controllers/destinationController");

const { Router } = require("express");
const destinationRouter = Router();

destinationRouter.get("/", findAllDestinations);
destinationRouter.get("/:id", findOneDestination);
destinationRouter.post("/new", postNewDestination)

module.exports = { destinationRouter };
