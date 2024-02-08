const {
  findOneDescription,
  findAllDestinations,
} = require("../controllers/destinationController");

const { Router } = require("express");
const destinationRouter = Router();

destinationRouter.get("/", findAllDestinations);
destinationRouter.get("/:id", findOneDescription);

module.exports = { destinationRouter };
