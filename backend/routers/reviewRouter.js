const {
    findAllReviewsByDID,
    findAllReviewsByUID,
    createReview,
    deleteAllByDestination
  } = require("../controllers/reviewController");
  
  const { Router } = require("express");
  const reviewRouter = Router();
  
  reviewRouter.get("/destination/:id", findAllReviewsByDID);
  reviewRouter.get("/user/:id", findAllReviewsByUID);
  reviewRouter.post("/", createReview)
  reviewRouter.delete("/bydestination/:id", deleteAllByDestination)
  
  module.exports = { reviewRouter };
  