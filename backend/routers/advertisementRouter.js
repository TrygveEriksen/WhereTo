const {
	findOneRandomAdvertisement,
    findOneAdvertisement,
    postNewAdvertisement,
    findAllAdvertisements,
    deleteAdvertisement
} = require("../controllers/advertisementController");
  
const { Router } = require("express");
const advertisementRouter = Router();

advertisementRouter.get("/", findOneRandomAdvertisement);
advertisementRouter.post("/new", postNewAdvertisement);
advertisementRouter.get("/all", findAllAdvertisements);
advertisementRouter.get("/:id", findOneAdvertisement);
advertisementRouter.delete("/:id", deleteAdvertisement);



module.exports = { advertisementRouter };