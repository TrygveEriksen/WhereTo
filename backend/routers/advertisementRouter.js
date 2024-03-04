const {
	findOneRandomAdvertisement,
    findOneAdvertisement,
    postNewAdvertisement
} = require("../controllers/advertisementController");
  
const { Router } = require("express");
const advertisementRouter = Router();

advertisementRouter.get("/", findOneRandomAdvertisement);
advertisementRouter.get("/:id", findOneAdvertisement);
advertisementRouter.post("/new", postNewAdvertisement);



module.exports = { advertisementRouter };